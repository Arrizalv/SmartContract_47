// ==================== TRANSACTION HISTORY ====================

async function loadHistory() {
    try {
        // Show loading state
        elements.txLoading.style.display = 'block';
        elements.txList.style.display = 'none';
        elements.txEmpty.style.display = 'none';

        const url = `${CONFIG.ETHERSCAN_API}?module=account&action=txlist&address=${CONFIG.CONTRACT_ADDRESS}&startblock=0&endblock=99999999&sort=desc`;
        const response = await fetch(url);
        const data = await response.json();

        elements.txLoading.style.display = 'none';

        if (data.status === '1' && data.result.length > 0) {
            elements.txList.style.display = 'block';
            renderHistory(data.result.slice(0, 5));
        } else {
            elements.txEmpty.style.display = 'block';
        }
    } catch (error) {
        console.error('History error:', error);
        elements.txLoading.style.display = 'none';
        elements.txEmpty.style.display = 'block';
    }
}

function renderHistory(transactions) {
    elements.txList.innerHTML = transactions.map(tx => {
        const isSuccess = tx.isError === '0';
        const value = tx.input.startsWith('0x6057361d') 
            ? parseInt(tx.input.slice(10), 16) 
            : null;
        const address = shortAddress(tx.from);
        const time = getTimeAgo(new Date(tx.timeStamp * 1000));

        return `
            <a href="https://sepolia.etherscan.io/tx/${tx.hash}" 
               target="_blank"
               class="flex items-center justify-between bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-all">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center 
                                ${isSuccess ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}">
                        <i class="fas fa-${isSuccess ? 'check' : 'times'} text-xs"></i>
                    </div>
                    <div>
                        <div class="text-white text-sm font-medium">
                            Store${value !== null ? `: ${value}` : ''}
                        </div>
                        <div class="text-gray-500 text-xs">${address} • ${time}</div>
                    </div>
                </div>
                <i class="fas fa-external-link-alt text-gray-500 text-xs"></i>
            </a>
        `;
    }).join('');
}
