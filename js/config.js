// ==================== CONFIG ====================
const CONFIG = {
    CONTRACT_ADDRESS: '0x723C53af5D645f15FcE4884C65202354F369977f',
    // Etherscan API V2 - unified endpoint for all chains
    ETHERSCAN_API: 'https://api.etherscan.io/v2/api',
    ETHERSCAN_API_KEY: 'MMJA49QD7P4Q91P9418BNE64GIFFQK4JMW',
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
