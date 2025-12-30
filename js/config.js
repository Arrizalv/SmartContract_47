// ==================== CONFIG ====================
const CONFIG = {
    CONTRACT_ADDRESS: '0x44777ef3E43777695AEE808bD2e2e9fF4Aee114F',
    // Etherscan API V2 - unified endpoint for all chains
    ETHERSCAN_API: 'https://api.etherscan.io/v2/api',
    ETHERSCAN_API_KEY: 'BF6R34IPYSV7S2Z86UNU1CQCIVXHHQG1AD',
    NETWORK: 'Sepolia',
    // Default chain ID for Sepolia
    CHAIN_ID: 11155111
};

// ==================== NETWORK LIST ====================
const NETWORKS = {
    // Mainnet
    ethereum: {
        chainId: '0x1',
        chainIdDecimal: 1,
        chainName: 'Ethereum Mainnet',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        rpcUrls: ['https://mainnet.infura.io/v3/'],
        blockExplorerUrls: ['https://etherscan.io']
    },
    // Testnet
    sepolia: {
        chainId: '0xaa36a7',
        chainIdDecimal: 11155111,
        chainName: 'Sepolia Testnet',
        nativeCurrency: { name: 'SepoliaETH', symbol: 'ETH', decimals: 18 },
        rpcUrls: ['https://sepolia.infura.io/v3/'],
        blockExplorerUrls: ['https://sepolia.etherscan.io']
    }
};

// ==================== STATE ====================
let currentAddress = null;
let isConnected = false;
let currentNetwork = null;
let elements = {};
