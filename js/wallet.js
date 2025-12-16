// Network Configurations
const NETWORKS = {
    sepolia: {
        chainId: '0xaa36a7',
        chainName: 'Sepolia Testnet',
        nativeCurrency: {
            name: 'Sepolia ETH',
            symbol: 'ETH',
            decimals: 18
        },
        rpcUrls: ['https://sepolia.infura.io/v3/'],
        blockExplorerUrls: ['https://sepolia.etherscan.io']
    },
    mainnet: {
        chainId: '0x1',
        chainName: 'Ethereum Mainnet',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18
        },
        rpcUrls: ['https://mainnet.infura.io/v3/'],
        blockExplorerUrls: ['https://etherscan.io']
    },
    goerli: {
        chainId: '0x5',
        chainName: 'Goerli Testnet',
        nativeCurrency: {
            name: 'Goerli ETH',
            symbol: 'ETH',
            decimals: 18
        },
        rpcUrls: ['https://goerli.infura.io/v3/'],
        blockExplorerUrls: ['https://goerli.etherscan.io']
    },
    polygon: {
        chainId: '0x89',
        chainName: 'Polygon Mainnet',
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18
        },
        rpcUrls: ['https://polygon-rpc.com/'],
        blockExplorerUrls: ['https://polygonscan.com']
    }
};

// Wallet Connection Manager
class WalletManager {
    constructor() {
        this.isConnected = false;
        this.currentAddress = null;
        this.currentNetwork = null;
        this.elements = {};
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.cacheElements();
            this.checkMetaMaskInstalled();
            this.setupEventListeners();
            this.resetToDisconnectedState();
            this.updateGlobalStatus();
        });
    }

    cacheElements() {
        this.elements = {
            connectButton: document.getElementById('connectButton'),
            disconnectButton: document.getElementById('disconnectButton'),
            walletInfo: document.getElementById('wallet-info'),
            disconnectedState: document.getElementById('disconnected-state'),
            statusMessage: document.getElementById('status-message'),
            addressDisplay: document.getElementById('address-display'),
            networkDisplay: document.getElementById('network-display'),
            balanceDisplay: document.getElementById('balance-display'),
            statusDisplay: document.getElementById('status-display'),
            globalStatus: document.getElementById('global-status'),
            networkSelector: document.getElementById('network-selector'),
            switchNetworkBtn: document.getElementById('switch-network-btn')
        };
    }

    checkMetaMaskInstalled() {
        if (typeof window.ethereum === 'undefined') {
            this.elements.connectButton.disabled = true;
            this.elements.connectButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> MetaMask Tidak Ditemukan';
            this.elements.statusMessage.innerHTML = '<p class="text-red-600 font-semibold">Silakan install MetaMask terlebih dahulu!</p>';
            this.elements.statusMessage.innerHTML += '<p class="mt-2"><a href="https://metamask.io/download/" target="_blank" class="text-blue-500 hover:text-blue-700 underline">Download MetaMask di sini</a></p>';
            return false;
        }
        return true;
    }

    updateGlobalStatus() {
        if (this.isConnected) {
            this.elements.globalStatus.textContent = "Connected";
            this.elements.globalStatus.className = "inline-block px-4 py-1 rounded-full font-bold text-sm bg-green-100 text-green-800";
        } else {
            this.elements.globalStatus.textContent = "Disconnected";
            this.elements.globalStatus.className = "inline-block px-4 py-1 rounded-full font-bold text-sm bg-gray-100 text-gray-600";
        }
    }

    resetToDisconnectedState() {
        this.isConnected = false;
        this.currentAddress = null;

        this.elements.walletInfo.style.display = 'none';
        this.elements.disconnectedState.style.display = 'block';

        this.elements.connectButton.innerHTML = '<i class="fas fa-plug"></i> Connect MetaMask Wallet';
        this.elements.connectButton.disabled = false;
        this.elements.disconnectButton.style.display = 'none';

        this.elements.statusMessage.innerHTML = '<p class="text-gray-600">Wallet terputus. Silakan connect kembali jika ingin menggunakan fitur Web3.</p>';

        this.updateGlobalStatus();
    }

    async connectWallet() {
        try {
            this.elements.statusMessage.innerHTML = '<p class="text-blue-600">Membuka MetaMask... Harap konfirmasi di popup MetaMask.</p>';

            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });

            if (accounts.length === 0) {
                throw new Error("Tidak ada akun yang dipilih");
            }

            this.currentAddress = accounts[0];
            this.isConnected = true;

            this.elements.walletInfo.style.display = 'block';
            this.elements.disconnectedState.style.display = 'none';

            this.elements.addressDisplay.textContent = this.currentAddress;

            const chainId = await window.ethereum.request({ 
                method: 'eth_chainId' 
            });

            this.currentNetwork = chainId;
            let networkName = this.getNetworkName(chainId);
            this.elements.networkDisplay.textContent = networkName;

            await this.updateBalance();

            this.elements.connectButton.innerHTML = '<i class="fas fa-check-circle"></i> Connected';
            this.elements.connectButton.disabled = true;
            this.elements.disconnectButton.style.display = 'inline-flex';

            this.elements.statusMessage.innerHTML = '<p class="text-green-600 font-semibold">Wallet berhasil terhubung!</p>';

            this.updateGlobalStatus();
            this.setupMetaMaskEventListeners();

        } catch (error) {
            console.error("Error connecting wallet:", error);
            if (error.code === 4001) {
                this.elements.statusMessage.innerHTML = '<p class="text-red-600 font-semibold">Anda menolak permintaan koneksi.</p>';
            } else if (error.message.includes("Tidak ada akun")) {
                this.elements.statusMessage.innerHTML = '<p class="text-red-600 font-semibold">Tidak ada akun yang dipilih. Silakan pilih akun di MetaMask.</p>';
            } else {
                this.elements.statusMessage.innerHTML = `<p class="text-red-600 font-semibold">Gagal terhubung: ${error.message}</p>`;
            }
            this.resetToDisconnectedState();
        }
    }

    getNetworkName(chainId) {
        const networks = {
            '0x1': 'Ethereum Mainnet',
            '0xaa36a7': 'Sepolia Testnet',
            '0x5': 'Goerli Testnet',
            '0x89': 'Polygon Mainnet'
        };
        return networks[chainId] || `Network (${chainId})`;
    }

    async switchNetwork(networkKey) {
        const network = NETWORKS[networkKey];
        if (!network) {
            console.error('Network not found:', networkKey);
            return;
        }

        try {
            this.elements.statusMessage.innerHTML = '<p class="text-blue-600">Mengganti jaringan... Harap konfirmasi di MetaMask.</p>';

            // Try to switch to the network
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: network.chainId }],
            });

            this.elements.statusMessage.innerHTML = `<p class="text-green-600 font-semibold">Berhasil beralih ke ${network.chainName}!</p>`;
            
            // Update network display
            this.currentNetwork = network.chainId;
            this.elements.networkDisplay.textContent = network.chainName;
            
            // Update balance after network switch
            await this.updateBalance();

        } catch (error) {
            // This error code indicates that the chain has not been added to MetaMask
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [network],
                    });
                    
                    this.elements.statusMessage.innerHTML = `<p class="text-green-600 font-semibold">Jaringan ${network.chainName} berhasil ditambahkan dan dipilih!</p>`;
                    this.currentNetwork = network.chainId;
                    this.elements.networkDisplay.textContent = network.chainName;
                    await this.updateBalance();
                    
                } catch (addError) {
                    console.error('Error adding network:', addError);
                    this.elements.statusMessage.innerHTML = `<p class="text-red-600 font-semibold">Gagal menambahkan jaringan: ${addError.message}</p>`;
                }
            } else if (error.code === 4001) {
                // User rejected the request
                this.elements.statusMessage.innerHTML = '<p class="text-red-600 font-semibold">Anda menolak permintaan ganti jaringan.</p>';
            } else {
                console.error('Error switching network:', error);
                this.elements.statusMessage.innerHTML = `<p class="text-red-600 font-semibold">Gagal mengganti jaringan: ${error.message}</p>`;
            }
        }
    }

    async updateBalance() {
        try {
            const balance = await window.ethereum.request({
                method: 'eth_getBalance',
                params: [this.currentAddress, 'latest']
            });

            const balanceInEth = parseInt(balance, 16) / 1e18;
            this.elements.balanceDisplay.textContent = `${balanceInEth.toFixed(4)} ETH`;

        } catch (error) {
            console.error("Error getting balance:", error);
            this.elements.balanceDisplay.textContent = "Error memuat saldo";
        }
    }

    disconnectWallet() {
        this.resetToDisconnectedState();
        this.elements.statusMessage.innerHTML = '<p class="text-green-600 font-semibold">Wallet berhasil diputuskan.</p>';
    }

    setupMetaMaskEventListeners() {
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
                this.elements.statusMessage.innerHTML = '<p class="text-red-600 font-semibold">Anda logout dari MetaMask.</p>';
                this.resetToDisconnectedState();
            } else if (accounts[0] !== this.currentAddress) {
                this.currentAddress = accounts[0];
                this.elements.addressDisplay.textContent = this.currentAddress;
                this.updateBalance();
                this.elements.statusMessage.innerHTML = '<p class="text-green-600 font-semibold">Akun wallet berhasil diubah!</p>';
            }
        });

        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        });

        window.ethereum.on('message', (message) => {
            if (message.type === 'tx' && (message.data?.status === 'confirmed' || message.data?.status === 'failed')) {
                setTimeout(() => this.updateBalance(), 2000);
            }
        });
    }

    setupEventListeners() {
        this.elements.connectButton.addEventListener('click', () => this.connectWallet());
        this.elements.disconnectButton.addEventListener('click', () => this.disconnectWallet());
        
        // Network switcher
        if (this.elements.switchNetworkBtn) {
            this.elements.switchNetworkBtn.addEventListener('click', () => {
                const selectedNetwork = this.elements.networkSelector.value;
                if (selectedNetwork) {
                    this.switchNetwork(selectedNetwork);
                }
            });
        }
    }
}

// Initialize wallet manager
const walletManager = new WalletManager();

console.log("MetaMask Web3 Demo loaded");
console.log("MetaMask available:", typeof window.ethereum !== 'undefined');
