// ==================== TRANSACTION HISTORY ====================

async function loadHistory() {
    try {
        // Show loading state
        elements.txLoading.style.display = 'block';
        elements.txList.style.display = 'none';
        elements.txEmpty.style.display = 'none';

        // Get chain ID and explorer URL based on current network
        const chainId = currentNetwork ? currentNetwork.chainIdDecimal : CONFIG.CHAIN_ID;
        const explorerUrl = currentNetwork ? currentNetwork.blockExplorerUrls[0] : 'https://sepolia.etherscan.io';

        // Fetch transactions using Etherscan API V2 (unified endpoint with chainid)
        const url = `${CONFIG.ETHERSCAN_API}?chainid=${chainId}&module=account&action=txlist&address=${CONFIG.CONTRACT_ADDRESS}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc&apikey=${CONFIG.ETHERSCAN_API_KEY}`;
        
        console.log('Fetching history from:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);

        elements.txLoading.style.display = 'none';

        // Check for API error messages
        if (data.message === 'NOTOK' || data.status === '0') {
            console.warn('API Error:', data.result || data.message);
            
            // If no transactions found, show empty state
            if (data.message === 'No transactions found' || data.result === 'No transactions found') {
                elements.txEmpty.style.display = 'block';
                elements.txEmpty.innerHTML = `
                    <i class="fas fa-inbox text-gray-600 text-2xl mb-2"></i>
                    <p>No transactions found for this contract</p>
                `;
                return;
            }
            
            // For other API errors (rate limit, invalid API key, etc.)
            elements.txEmpty.style.display = 'block';
            elements.txEmpty.innerHTML = `
                <i class="fas fa-exclamation-triangle text-yellow-500 text-xl mb-2"></i>
                <p class="text-sm">${data.result || 'API Error'}</p>
            `;
            return;
        }

        if (data.status === '1' && Array.isArray(data.result) && data.result.length > 0) {
            console.log('Total transactions found:', data.result.length);
            
            // Filter only store() function calls (method ID: 0x6057361d)
            const storeTransactions = data.result.filter(tx => {
                const isStoreFunction = tx.input && tx.input.toLowerCase().startsWith('0x6057361d');
                return isStoreFunction;
            });
            
            console.log('Store transactions found:', storeTransactions.length);

            // If wallet is connected, optionally filter by current wallet
            // But also show all store transactions if no wallet is connected
            let filteredTransactions = storeTransactions;
            
            if (currentAddress) {
                // Show transactions from current wallet first, then others
                const myTransactions = storeTransactions.filter(tx => 
                    tx.from.toLowerCase() === currentAddress.toLowerCase()
                );
                const otherTransactions = storeTransactions.filter(tx => 
                    tx.from.toLowerCase() !== currentAddress.toLowerCase()
                );
                
                console.log('My transactions:', myTransactions.length);
                console.log('Other transactions:', otherTransactions.length);
                
                // Show user's transactions first, then others
                filteredTransactions = [...myTransactions, ...otherTransactions];
            }

            if (filteredTransactions.length > 0) {
                elements.txList.style.display = 'block';
                renderHistory(filteredTransactions.slice(0, 10), explorerUrl);
            } else {
                elements.txEmpty.style.display = 'block';
                elements.txEmpty.innerHTML = `
                    <i class="fas fa-inbox text-gray-600 text-2xl mb-2"></i>
                    <p>No store() transactions found</p>
                `;
            }
        } else {
            elements.txEmpty.style.display = 'block';
            elements.txEmpty.innerHTML = `
                <i class="fas fa-inbox text-gray-600 text-2xl mb-2"></i>
                <p>No transactions found</p>
            `;
        }
    } catch (error) {
        console.error('History error:', error);
        elements.txLoading.style.display = 'none';
        elements.txEmpty.style.display = 'block';
        elements.txEmpty.innerHTML = `
            <i class="fas fa-exclamation-circle text-red-500 text-xl mb-2"></i>
            <p>Failed to load history</p>
            <p class="text-xs text-gray-500 mt-1">${error.message}</p>
        `;
    }
}

function renderHistory(transactions, explorerUrl = 'https://sepolia.etherscan.io') {
    elements.txList.innerHTML = transactions.map(tx => {
        const isSuccess = tx.isError === '0';
        const isMyTransaction = currentAddress && tx.from.toLowerCase() === currentAddress.toLowerCase();
        
        // Decode the stored value from input data (remove method ID and parse hex)
        let value = null;
        if (tx.input && tx.input.toLowerCase().startsWith('0x6057361d')) {
            try {
                value = parseInt(tx.input.slice(10), 16);
            } catch (e) {
                console.warn('Failed to parse value from input:', tx.input);
            }
        }
        
        const address = shortAddress(tx.from);
        const time = getTimeAgo(new Date(tx.timeStamp * 1000));

        return `
            <a href="${explorerUrl}/tx/${tx.hash}" 
               target="_blank"
               class="flex items-center justify-between bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-all ${isMyTransaction ? 'border border-purple-500/30' : ''}">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center 
                                ${isSuccess ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}">
                        <i class="fas fa-${isSuccess ? 'check' : 'times'} text-xs"></i>
                    </div>
                    <div>
                        <div class="text-white text-sm font-medium flex items-center gap-2">
                            Store${value !== null ? `: ${value}` : ''}
                            ${isMyTransaction ? '<span class="text-xs bg-purple-500/30 text-purple-300 px-1.5 py-0.5 rounded">You</span>' : ''}
                        </div>
                        <div class="text-gray-500 text-xs">${address} • ${time}</div>
                    </div>
                </div>
                <i class="fas fa-external-link-alt text-gray-500 text-xs"></i>
            </a>
        `;
    }).join('');
}
