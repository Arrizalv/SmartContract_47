// ==================== WALLET CONNECTION ====================

async function connectWallet() {
    try {
        showMessage('Opening MetaMask...', 'info');

        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        
        if (accounts.length === 0) {
            throw new Error('No account selected');
        }

        currentAddress = accounts[0];
        isConnected = true;

        // Update UI
        elements.walletInfo.style.display = 'block';
        elements.contractSection.style.display = 'block';
        elements.disconnectedState.style.display = 'none';
        elements.connectBtn.style.display = 'none';
        elements.disconnectBtn.style.display = 'inline-flex';
        
        elements.addressDisplay.textContent = currentAddress;
        elements.networkDisplay.textContent = CONFIG.NETWORK;
        
        updateGlobalStatus(true);
        showMessage('', 'info');

        // Load data
        await updateBalance();
        await retrieveValue();
        await loadHistory();

        // Listen for account/network changes
        window.ethereum.on('accountsChanged', handleAccountChange);
        window.ethereum.on('chainChanged', () => window.location.reload());

    } catch (error) {
        console.error('Connect error:', error);
        showMessage(error.code === 4001 ? 'Connection rejected' : 'Failed to connect', 'error');
    }
}

function disconnectWallet() {
    currentAddress = null;
    isConnected = false;

    elements.walletInfo.style.display = 'none';
    elements.contractSection.style.display = 'none';
    elements.disconnectedState.style.display = 'block';
    elements.connectBtn.style.display = 'inline-flex';
    elements.disconnectBtn.style.display = 'none';
    
    updateGlobalStatus(false);
    showMessage('', 'info');
}

function handleAccountChange(accounts) {
    if (accounts.length === 0) {
        disconnectWallet();
    } else {
        currentAddress = accounts[0];
        elements.addressDisplay.textContent = currentAddress;
        updateBalance();
    }
}

async function updateBalance() {
    try {
        const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [currentAddress, 'latest']
        });
        
        const eth = parseInt(balance, 16) / 1e18;
        elements.balanceDisplay.textContent = `${eth.toFixed(4)} ETH`;
    } catch (error) {
        elements.balanceDisplay.textContent = 'Error';
    }
}

function updateGlobalStatus(connected) {
    elements.globalStatus.textContent = connected ? 'Connected' : 'Disconnected';
    elements.globalStatus.className = `my-2 inline-block px-3 py-1 rounded-full text-sm ${
        connected ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-300'
    }`;
}
