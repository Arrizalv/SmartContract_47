// ==================== CONFIG ====================
const CONFIG = {
    CONTRACT_ADDRESS: '0x723C53af5D645f15FcE4884C65202354F369977f',
    ETHERSCAN_API: 'https://api-sepolia.etherscan.io/api',
    NETWORK: 'Sepolia'
};

// ==================== NETWORK LIST ====================
const NETWORKS = {
    // Mainnet
    ethereum: {
        chainId: '0x1',
        chainName: 'Ethereum Mainnet',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        rpcUrls: ['https://mainnet.infura.io/v3/'],
        blockExplorerUrls: ['https://etherscan.io'],
        etherscanApi: 'https://api.etherscan.io/api'
    },
    // Testnets
    sepolia: {
        chainId: '0xaa36a7',
        chainName: 'Sepolia Testnet',
        nativeCurrency: { name: 'SepoliaETH', symbol: 'ETH', decimals: 18 },
        rpcUrls: ['https://sepolia.infura.io/v3/'],
        blockExplorerUrls: ['https://sepolia.etherscan.io'],
        etherscanApi: 'https://api-sepolia.etherscan.io/api'
    },
    goerli: {
        chainId: '0x5',
        chainName: 'Goerli Testnet',
        nativeCurrency: { name: 'GoerliETH', symbol: 'ETH', decimals: 18 },
        rpcUrls: ['https://goerli.infura.io/v3/'],
        blockExplorerUrls: ['https://goerli.etherscan.io'],
        etherscanApi: 'https://api-goerli.etherscan.io/api'
    },
    holesky: {
        chainId: '0x4268',
        chainName: 'Holesky Testnet',
        nativeCurrency: { name: 'HoleskyETH', symbol: 'ETH', decimals: 18 },
        rpcUrls: ['https://ethereum-holesky.publicnode.com'],
        blockExplorerUrls: ['https://holesky.etherscan.io'],
        etherscanApi: 'https://api-holesky.etherscan.io/api'
    },
    // Layer 2 / Sidechains
    polygon: {
        chainId: '0x89',
        chainName: 'Polygon Mainnet',
        nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
        rpcUrls: ['https://polygon-rpc.com'],
        blockExplorerUrls: ['https://polygonscan.com'],
        etherscanApi: 'https://api.polygonscan.com/api'
    },
    bsc: {
        chainId: '0x38',
        chainName: 'BNB Smart Chain',
        nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
        rpcUrls: ['https://bsc-dataseed.binance.org'],
        blockExplorerUrls: ['https://bscscan.com'],
        etherscanApi: 'https://api.bscscan.com/api'
    },
    arbitrum: {
        chainId: '0xa4b1',
        chainName: 'Arbitrum One',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        rpcUrls: ['https://arb1.arbitrum.io/rpc'],
        blockExplorerUrls: ['https://arbiscan.io'],
        etherscanApi: 'https://api.arbiscan.io/api'
    },
    optimism: {
        chainId: '0xa',
        chainName: 'Optimism',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        rpcUrls: ['https://mainnet.optimism.io'],
        blockExplorerUrls: ['https://optimistic.etherscan.io'],
        etherscanApi: 'https://api-optimistic.etherscan.io/api'
    }
};

// ==================== STATE ====================
let currentAddress = null;
let isConnected = false;
let currentNetwork = null;
let elements = {};
