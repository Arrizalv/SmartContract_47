# 🔗 Simple Storage DApp - Web3 Demo Application

> Demo aplikasi **Decentralized Application (DApp)** untuk praktikum pemrograman web dengan fitur koneksi MetaMask wallet, Sepolia Testnet, dan interaksi **Smart Contract** secara langsung.

[![Solidity](https://img.shields.io/badge/Solidity-0.8.19-363636?logo=solidity)](https://soliditylang.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-CDN-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Network](https://img.shields.io/badge/Network-Sepolia_Testnet-7C3AED)](https://sepolia.dev/)

---

## 📋 Daftar Isi

- [Gambaran Umum](#-gambaran-umum)
- [Demo & Screenshot](#-demo--screenshot)
- [Arsitektur Aplikasi](#-arsitektur-aplikasi)
- [Struktur Folder](#-struktur-folder)
- [Tech Stack](#-tech-stack)
- [Fitur Lengkap](#-fitur-lengkap)
- [Smart Contract](#-smart-contract)
- [Penjelasan Kode JavaScript](#-penjelasan-kode-javascript)
- [Alur Kerja Aplikasi](#-alur-kerja-aplikasi)
- [Panduan Instalasi](#-panduan-instalasi)
- [Langkah-Langkah Praktikum](#-langkah-langkah-praktikum)
- [Konsep Blockchain Penting](#-konsep-blockchain-penting)
- [Troubleshooting](#-troubleshooting)
- [Referensi](#-referensi)

---

## 🌟 Gambaran Umum

**Simple Storage DApp** adalah aplikasi web yang memungkinkan pengguna berinteraksi dengan smart contract di blockchain Ethereum (Sepolia Testnet). Aplikasi ini mendemonstrasikan konsep dasar Web3:

| Komponen | Deskripsi |
|----------|-----------|
| **Frontend** | Website HTML/CSS/JS yang berjalan di browser |
| **Wallet** | MetaMask sebagai jembatan antara website dan blockchain |
| **Backend** | Smart Contract yang berjalan di blockchain (bukan server tradisional) |
| **Database** | Blockchain itu sendiri (data tersimpan secara terdesentralisasi) |

### Apa yang Bisa Dilakukan Aplikasi Ini?

1. 🔌 **Connect Wallet** - Menghubungkan MetaMask ke website
2. 💰 **View Balance** - Melihat saldo ETH di wallet
3. 📖 **Read Data** - Membaca angka yang tersimpan di smart contract (gratis)
4. ✍️ **Write Data** - Menyimpan angka baru ke smart contract (butuh gas)
5. 📜 **View History** - Melihat riwayat transaksi dari Etherscan API

---

## 🖼️ Demo & Screenshot

### Tampilan Utama Aplikasi

```
┌─────────────────────────────────────────────────────────────┐
│                     🔷 Simple Storage                        │
│                 Smart Contract on Sepolia                    │
│                      [Connected]                             │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │ ✅ Connected                           [Sepolia]    │    │
│  │                                                      │    │
│  │  Address              │  Balance                    │    │
│  │  0x1234...5678        │  0.5432 ETH                 │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Stored Number                           │    │
│  │                  [ 42 ]                              │    │
│  │              [🔄 Refresh]                            │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  💾 Store New Number                                 │    │
│  │  [Enter a number....] [📤 Store]                     │    │
│  │  ⛽ This transaction requires gas fee               │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  📜 Transaction History                              │    │
│  │  ✅ Store: 42  │ 0x1234...5678 • 2m ago  [↗]       │    │
│  │  ✅ Store: 10  │ 0xabcd...efgh • 1h ago  [↗]       │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Arsitektur Aplikasi

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         ARSITEKTUR DAPP                                  │
└─────────────────────────────────────────────────────────────────────────┘

                    ┌──────────────────┐
                    │   USER BROWSER   │
                    │  ┌────────────┐  │
                    │  │ index.html │  │
                    │  │   + CSS    │  │
                    │  │   + JS     │  │
                    │  └─────┬──────┘  │
                    └────────┼─────────┘
                             │
                    ┌────────▼─────────┐
                    │    METAMASK      │
                    │   (Extension)    │
                    │  ┌────────────┐  │
                    │  │ Private Key│  │
                    │  │   Signer   │  │
                    │  └─────┬──────┘  │
                    └────────┼─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼────────┐     │     ┌────────▼────────┐
     │  SEPOLIA NODE   │     │     │  ETHERSCAN API  │
     │   (Infura/etc)  │     │     │  (History Data) │
     └────────┬────────┘     │     └─────────────────┘
              │              │
              │    ┌─────────▼─────────┐
              │    │   SMART CONTRACT  │
              └───▶│  SimpleStorage    │
                   │  0x723C53...977f  │
                   └───────────────────┘
                             │
                   ┌─────────▼─────────┐
                   │    BLOCKCHAIN     │
                   │  (Sepolia State)  │
                   │  storedNumber: 42 │
                   └───────────────────┘
```

---

## 📁 Struktur Folder

```
smartcontract/
├── 📄 index.html                 # Halaman utama aplikasi DApp
├── 📄 README.md                  # Dokumentasi lengkap (file ini)
│
├── 📂 css/
│   └── 📄 custom.css             # Custom styles & animasi CSS
│
├── 📂 js/
│   ├── 📄 config.js              # Konfigurasi (contract address, API URL)
│   ├── 📄 utils.js               # Fungsi utility (showMessage, timeAgo, dll)
│   ├── 📄 connect.js             # Logika koneksi wallet MetaMask
│   ├── 📄 contract.js            # Interaksi dengan smart contract
│   ├── 📄 history.js             # Fetch & render transaction history
│   └── 📄 wallet.js              # Main entry point, inisialisasi app
│
├── 📂 contracts/
│   ├── 📄 SimpleStorage.sol      # Source code smart contract (Solidity)
│   └── 📄 SimpleStorage.json     # ABI (Application Binary Interface)
│
└── 📂 assets/                    # Folder untuk gambar/icon (opsional)
```

### Penjelasan Setiap File

| File | Fungsi | Line of Code |
|------|--------|--------------|
| `index.html` | UI utama dengan Tailwind CSS, struktur halaman, dan load scripts | ~130 lines |
| `config.js` | Menyimpan konstanta: contract address, API URL, state global | ~12 lines |
| `utils.js` | Helper functions: showMessage, getTimeAgo, shortAddress | ~25 lines |
| `connect.js` | Handle connect/disconnect wallet, update balance, event listeners | ~75 lines |
| `contract.js` | Fungsi retrieve() dan store() untuk interaksi smart contract | ~70 lines |
| `history.js` | Fetch history dari Etherscan API dan render ke UI | ~50 lines |
| `wallet.js` | Entry point: init DOM elements, setup event listeners | ~60 lines |

---

## 🚀 Tech Stack

### Frontend
| Technology | Versi | Penggunaan |
|------------|-------|------------|
| **HTML5** | - | Struktur halaman semantik |
| **Tailwind CSS** | CDN 3.x | Utility-first CSS framework untuk styling |
| **Vanilla JavaScript** | ES6+ | Logika aplikasi tanpa framework |
| **Font Awesome** | 6.4.0 | Icon library |

### Blockchain
| Technology | Versi | Penggunaan |
|------------|-------|------------|
| **Solidity** | 0.8.19 | Bahasa pemrograman smart contract |
| **MetaMask** | Latest | Wallet & signer untuk transaksi |
| **Ethereum JSON-RPC** | - | Komunikasi dengan blockchain via `window.ethereum` |
| **Sepolia Testnet** | - | Test network untuk development |

### API & Tools
| Technology | Penggunaan |
|------------|------------|
| **Etherscan API** | Mengambil transaction history |
| **Remix IDE** | Deploy & test smart contract |

---

## ✨ Fitur Lengkap

### 🔌 Wallet Management
- ✅ Connect MetaMask wallet dengan `eth_requestAccounts`
- ✅ Disconnect wallet (reset UI state)
- ✅ Menampilkan alamat wallet (format pendek)
- ✅ Menampilkan saldo ETH real-time
- ✅ Deteksi jaringan aktif (Sepolia)
- ✅ Auto-detect perubahan akun (`accountsChanged` event)
- ✅ Auto-reload saat ganti network (`chainChanged` event)

### 📜 Smart Contract Interaction
- ✅ **Read** - Membaca stored number (free, no gas)
- ✅ **Write** - Menyimpan angka baru (requires gas)
- ✅ Validasi input sebelum transaksi
- ✅ Loading state saat menunggu konfirmasi
- ✅ Auto-refresh setelah transaksi sukses

### 📊 Transaction History
- ✅ Fetch history dari Etherscan API
- ✅ Menampilkan 5 transaksi terakhir
- ✅ Parse transaction data untuk menampilkan nilai
- ✅ Link ke Etherscan untuk detail transaksi
- ✅ Format waktu relatif (2m ago, 1h ago, dll)

### 🎨 UI/UX
- ✅ Responsive design (mobile-friendly)
- ✅ Dark mode theme
- ✅ Loading indicators
- ✅ Error messages dengan auto-dismiss
- ✅ Smooth animations & transitions

---

## 📜 Smart Contract

### Source Code (`contracts/SimpleStorage.sol`)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleStorage {
    // State variable - tersimpan permanen di blockchain
    uint256 private storedNumber;

    // Function untuk menyimpan angka (WRITE - butuh gas)
    function store(uint256 _number) public {
        storedNumber = _number;
    }

    // Function untuk membaca angka (READ - gratis)
    function retrieve() public view returns (uint256) {
        return storedNumber;
    }
}
```

### ABI (Application Binary Interface)

ABI adalah "interface" yang menjelaskan bagaimana frontend berkomunikasi dengan smart contract:

```json
[
  {
    "inputs": [],
    "name": "retrieve",
    "outputs": [{ "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_number", "type": "uint256" }],
    "name": "store",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
```

### Contract Address (Sepolia)

```
0x723C53af5D645f15FcE4884C65202354F369977f
```

🔗 [View on Etherscan](https://sepolia.etherscan.io/address/0x723C53af5D645f15FcE4884C65202354F369977f)

### Function Selectors

| Function | Selector | Perhitungan |
|----------|----------|-------------|
| `retrieve()` | `0x2e64cec1` | `keccak256("retrieve()")[:4]` |
| `store(uint256)` | `0x6057361d` | `keccak256("store(uint256)")[:4]` |

---

## 💻 Penjelasan Kode JavaScript

### 1️⃣ `config.js` - Konfigurasi Global

```javascript
// Konstanta yang digunakan di seluruh aplikasi
const CONFIG = {
    CONTRACT_ADDRESS: '0x723C53af5D645f15FcE4884C65202354F369977f',
    ETHERSCAN_API: 'https://api-sepolia.etherscan.io/api',
    NETWORK: 'Sepolia'
};

// State global aplikasi
let currentAddress = null;   // Alamat wallet yang terkoneksi
let isConnected = false;     // Status koneksi
let elements = {};           // Cache DOM elements
```

### 2️⃣ `utils.js` - Fungsi Utility

```javascript
// Menampilkan pesan status dengan warna berbeda
function showMessage(msg, type) {
    const colors = { 
        success: 'text-green-400',  // Hijau untuk sukses
        error: 'text-red-400',      // Merah untuk error
        info: 'text-blue-400'       // Biru untuk info
    };
    // Auto-dismiss setelah 4 detik (kecuali info)
}

// Format waktu relatif: "2m ago", "1h ago", "3d ago"
function getTimeAgo(date) { ... }

// Format alamat pendek: "0x1234...5678"
function shortAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
```

### 3️⃣ `connect.js` - Wallet Connection

```javascript
async function connectWallet() {
    // 1. Request akses ke MetaMask
    const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
    });
    
    // 2. Simpan address & update UI
    currentAddress = accounts[0];
    isConnected = true;
    
    // 3. Load data: balance, contract value, history
    await updateBalance();
    await retrieveValue();
    await loadHistory();
    
    // 4. Setup event listeners untuk perubahan
    window.ethereum.on('accountsChanged', handleAccountChange);
    window.ethereum.on('chainChanged', () => window.location.reload());
}

async function updateBalance() {
    // Mengambil saldo menggunakan eth_getBalance
    const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [currentAddress, 'latest']
    });
    // Convert dari Wei (hex) ke ETH
    const eth = parseInt(balance, 16) / 1e18;
}
```

### 4️⃣ `contract.js` - Smart Contract Interaction

```javascript
// READ: Membaca nilai dari contract (gratis, tidak butuh gas)
async function retrieveValue() {
    const result = await window.ethereum.request({
        method: 'eth_call',  // eth_call = read-only
        params: [{ 
            to: CONFIG.CONTRACT_ADDRESS, 
            data: '0x2e64cec1'  // Function selector untuk retrieve()
        }, 'latest']
    });
    // Parse hasil dari hex ke integer
    const value = parseInt(result, 16);
}

// WRITE: Menyimpan nilai ke contract (butuh gas)
async function storeValue() {
    // 1. Encode parameter: number -> 64 karakter hex
    const data = '0x6057361d' + number.toString(16).padStart(64, '0');
    
    // 2. Kirim transaksi (MetaMask akan popup untuk konfirmasi)
    const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{ 
            from: currentAddress, 
            to: CONFIG.CONTRACT_ADDRESS, 
            data 
        }]
    });
    
    // 3. Tunggu transaksi dikonfirmasi
    await waitForTransaction(txHash);
}

// Polling untuk menunggu transaksi confirmed
async function waitForTransaction(txHash) {
    while (true) {
        const receipt = await window.ethereum.request({
            method: 'eth_getTransactionReceipt',
            params: [txHash]
        });
        if (receipt) return receipt;
        await new Promise(r => setTimeout(r, 2000)); // Wait 2 seconds
    }
}
```

### 5️⃣ `history.js` - Transaction History

```javascript
async function loadHistory() {
    // Fetch dari Etherscan API
    const url = `${CONFIG.ETHERSCAN_API}?module=account&action=txlist&address=${CONFIG.CONTRACT_ADDRESS}&sort=desc`;
    const response = await fetch(url);
    const data = await response.json();
    
    // Render 5 transaksi terakhir
    renderHistory(data.result.slice(0, 5));
}

function renderHistory(transactions) {
    // Parse setiap transaksi
    transactions.map(tx => {
        // Cek apakah ini transaksi store()
        if (tx.input.startsWith('0x6057361d')) {
            // Extract nilai dari input data
            const value = parseInt(tx.input.slice(10), 16);
        }
    });
}
```

### 6️⃣ `wallet.js` - Main Entry Point

```javascript
document.addEventListener('DOMContentLoaded', init);

function init() {
    // 1. Cache semua DOM elements
    elements = {
        connectBtn: document.getElementById('connectButton'),
        storeBtn: document.getElementById('storeBtn'),
        // ... dll
    };
    
    // 2. Cek apakah MetaMask terinstall
    checkMetaMask();
    
    // 3. Setup event listeners untuk buttons
    setupEventListeners();
}

function setupEventListeners() {
    elements.connectBtn.addEventListener('click', connectWallet);
    elements.disconnectBtn.addEventListener('click', disconnectWallet);
    elements.storeBtn.addEventListener('click', storeValue);
    elements.retrieveBtn.addEventListener('click', retrieveValue);
}
```

---

## 🔄 Alur Kerja Aplikasi

### Alur Connect Wallet

```
┌────────────────────────────────────────────────────────────────────────────┐
│                          ALUR CONNECT WALLET                               │
└────────────────────────────────────────────────────────────────────────────┘

  User              Website             MetaMask            Blockchain
   │                   │                   │                    │
   │ 1. Click Connect  │                   │                    │
   │──────────────────▶│                   │                    │
   │                   │ 2. eth_request    │                    │
   │                   │    Accounts       │                    │
   │                   │──────────────────▶│                    │
   │                   │                   │ 3. Show Popup      │
   │                   │◀──────────────────│                    │
   │ 4. User Approve   │                   │                    │
   │──────────────────────────────────────▶│                    │
   │                   │ 5. Return Address │                    │
   │                   │◀──────────────────│                    │
   │                   │ 6. eth_getBalance │                    │
   │                   │──────────────────▶│                    │
   │                   │                   │ 7. Query Balance   │
   │                   │                   │───────────────────▶│
   │                   │                   │ 8. Return Balance  │
   │                   │◀──────────────────│◀───────────────────│
   │ 9. Show Wallet    │                   │                    │
   │    Info           │                   │                    │
   │◀──────────────────│                   │                    │
```

### Alur Store Value (Write Transaction)

```
┌────────────────────────────────────────────────────────────────────────────┐
│                        ALUR STORE VALUE                                    │
└────────────────────────────────────────────────────────────────────────────┘

  User              Website             MetaMask            Contract
   │                   │                   │                    │
   │ 1. Input: 42      │                   │                    │
   │    Click Store    │                   │                    │
   │──────────────────▶│                   │                    │
   │                   │ 2. Encode Data    │                    │
   │                   │    0x6057361d     │                    │
   │                   │    + 00...002a    │                    │
   │                   │──────────────────▶│                    │
   │                   │                   │ 3. Show Popup      │
   │                   │                   │    "Confirm Tx"    │
   │◀──────────────────│◀──────────────────│                    │
   │ 4. Click Confirm  │                   │                    │
   │──────────────────▶│──────────────────▶│                    │
   │                   │                   │ 5. Sign & Send     │
   │                   │                   │───────────────────▶│
   │                   │                   │                    │
   │                   │                   │ 6. Execute         │
   │                   │                   │    store(42)       │
   │                   │                   │                    │
   │                   │                   │ 7. Return Receipt  │
   │                   │◀──────────────────│◀───────────────────│
   │ 8. Show Success   │                   │                    │
   │    + Refresh      │                   │                    │
   │◀──────────────────│                   │                    │
```

### Alur Retrieve Value (Read - Gratis)

```
┌────────────────────────────────────────────────────────────────────────────┐
│                     ALUR RETRIEVE VALUE                                    │
└────────────────────────────────────────────────────────────────────────────┘

  User              Website             Node                Contract
   │                   │                   │                    │
   │ 1. Click Refresh  │                   │                    │
   │──────────────────▶│                   │                    │
   │                   │ 2. eth_call       │                    │
   │                   │    (read-only)    │                    │
   │                   │──────────────────▶│                    │
   │                   │                   │ 3. Call retrieve() │
   │                   │                   │───────────────────▶│
   │                   │                   │ 4. Return 42       │
   │                   │◀──────────────────│◀───────────────────│
   │ 5. Display: 42    │                   │                    │
   │◀──────────────────│                   │                    │
   │                   │                   │                    │
   │    ⚡ NO GAS FEE - READ OPERATION IS FREE!                 │
```

---

## 🛠️ Panduan Instalasi

### Prerequisites

| Software | Link Download | Keterangan |
|----------|---------------|------------|
| **Browser Modern** | Chrome/Firefox/Edge | Harus support extensions |
| **MetaMask** | [metamask.io/download](https://metamask.io/download/) | Wallet extension |
| **Text Editor** | VS Code recommended | Untuk edit code |
| **Live Server** (opsional) | VS Code Extension | Untuk local development |

### Step 1: Clone/Download Project

```bash
# Option A: Clone repository
git clone <repository-url>
cd smartcontract

# Option B: Download ZIP dan extract
# Kemudian masuk ke folder smartcontract
```

### Step 2: Setup MetaMask

1. **Install MetaMask Extension**
   - Buka [metamask.io/download](https://metamask.io/download/)
   - Install sesuai browser yang digunakan
   - Buat wallet baru atau import existing

2. **Tambah Sepolia Testnet**
   ```
   Network Name: Sepolia Test Network
   RPC URL: https://sepolia.infura.io/v3/YOUR-PROJECT-ID
   Chain ID: 11155111
   Currency Symbol: ETH
   Block Explorer: https://sepolia.etherscan.io
   ```
   Atau gunakan [chainlist.org](https://chainlist.org/chain/11155111) untuk auto-add

3. **Dapatkan Test ETH (Faucet)**
   - [Google Cloud Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia) - 0.05 ETH/hari
   - [Alchemy Faucet](https://sepoliafaucet.com/) - 0.5 ETH/hari
   - [Infura Faucet](https://www.infura.io/faucet/sepolia)

### Step 3: Jalankan Aplikasi

```bash
# Option 1: Langsung buka file
# Double-click index.html di File Explorer

# Option 2: VS Code Live Server
# 1. Install extension "Live Server"
# 2. Right-click index.html → "Open with Live Server"

# Option 3: Python HTTP Server
python -m http.server 8000
# Buka http://localhost:8000

# Option 4: Node.js (npx)
npx serve .
# Buka URL yang ditampilkan
```

---

## 📝 Langkah-Langkah Praktikum

### Praktikum 1: Deploy Smart Contract

**Tujuan:** Memahami proses compile dan deploy smart contract ke blockchain

1. **Buka Remix IDE** → [remix.ethereum.org](https://remix.ethereum.org)

2. **Buat File Contract**
   - File Explorer → New File → `SimpleStorage.sol`
   - Copy-paste kode dari `contracts/SimpleStorage.sol`

3. **Compile Contract**
   - Tab "Solidity Compiler" (icon ✓)
   - Compiler version: `0.8.19`
   - Klik "Compile SimpleStorage.sol"
   - Pastikan ada ✅ hijau

4. **Deploy ke Sepolia**
   - Tab "Deploy & Run" (icon Ethereum)
   - Environment: **Injected Provider - MetaMask**
   - Pastikan MetaMask di network **Sepolia**
   - Klik **Deploy**
   - Confirm di MetaMask popup
   - Tunggu sampai confirmed (~15-30 detik)

5. **Catat Contract Address**
   - Lihat di "Deployed Contracts"
   - Copy address (format `0x...`)
   - Update di `js/config.js` jika berbeda

### Praktikum 2: Interaksi via Remix

**Tujuan:** Memahami perbedaan READ dan WRITE operation

1. **Read Operation (Gratis)**
   - Expand deployed contract
   - Klik tombol `retrieve` (biru)
   - Lihat hasil: `0: uint256: 0`
   - **Tidak ada popup MetaMask** = gratis

2. **Write Operation (Butuh Gas)**
   - Input angka di field `store`
   - Klik tombol `store` (orange)
   - MetaMask popup muncul → Confirm
   - Tunggu transaksi confirmed
   - Klik `retrieve` lagi → nilai berubah

### Praktikum 3: Interaksi via Website

**Tujuan:** Memahami cara frontend berkomunikasi dengan smart contract

1. **Jalankan Website** (lihat panduan instalasi)

2. **Connect Wallet**
   - Klik "Connect Wallet"
   - Approve di MetaMask popup
   - Lihat address dan balance muncul

3. **Read dari Contract**
   - Lihat "Stored Number" menampilkan nilai
   - Klik "Refresh" untuk update

4. **Write ke Contract**
   - Input angka baru
   - Klik "Store"
   - Confirm di MetaMask
   - Tunggu konfirmasi
   - Nilai otomatis refresh

5. **Lihat History**
   - Scroll ke Transaction History
   - Klik link untuk buka di Etherscan

### Praktikum 4: Analisa Kode JavaScript

**Tujuan:** Memahami cara kerja komunikasi JavaScript ↔ Blockchain

1. **Buka DevTools** (F12)
2. **Connect Wallet** dan lihat Console
3. **Analisa request yang dikirim:**
   - `eth_requestAccounts` - minta akses
   - `eth_getBalance` - ambil saldo
   - `eth_call` - read contract
   - `eth_sendTransaction` - write contract

4. **Modifikasi Kode:**
   - Ubah pesan di `utils.js`
   - Tambah console.log di `contract.js`
   - Refresh dan test

---

## 📊 Konsep Blockchain Penting

### Gas & Gas Fee

| Konsep | Penjelasan | Analogi |
|--------|------------|---------|
| **Gas** | Unit komputasi di Ethereum | Liter bensin |
| **Gas Price** | Harga per unit gas (Gwei) | Harga per liter |
| **Gas Limit** | Maksimum gas yang diizinkan | Kapasitas tangki |
| **Gas Fee** | Total biaya = Gas × Gas Price | Total bayar SPBU |

```
Contoh Transaksi store():
- Gas Used: 43,532 gas
- Gas Price: 1.5 Gwei
- Total Fee: 43,532 × 1.5 = 65,298 Gwei = 0.000065298 ETH
```

### Perbedaan eth_call vs eth_sendTransaction

| Aspek | `eth_call` | `eth_sendTransaction` |
|-------|------------|----------------------|
| **Tipe** | Read-only | Write (state change) |
| **Gas Fee** | ❌ Gratis | ✅ Butuh ETH |
| **Konfirmasi** | Instant | Butuh mining (~15 detik) |
| **MetaMask Popup** | Tidak ada | Muncul untuk approval |
| **Contoh** | `retrieve()` | `store(42)` |

### Transaction Receipt

```javascript
{
  transactionHash: '0x123...',    // ID unik transaksi
  blockNumber: 12345678,          // Nomor block
  from: '0xabc...',               // Pengirim
  to: '0x723...',                 // Contract address
  gasUsed: '43532',               // Gas yang terpakai
  status: '0x1',                  // 0x1 = sukses, 0x0 = gagal
}
```

### Function Selector Encoding

```
Function: store(uint256)
Selector: keccak256("store(uint256)")[:4] = 0x6057361d

Parameter: 42 (decimal) = 2a (hex)
Padded to 32 bytes: 000000000000000000000000000000000000000000000000000000000000002a

Full calldata: 0x6057361d000000000000000000000000000000000000000000000000000000000000002a
               └──────┘ └────────────────────────────────────────────────────────────────┘
               selector                           parameter (32 bytes)
```

---

## ❓ Troubleshooting

### MetaMask Tidak Terdeteksi

```
❌ Error: "MetaMask Not Found"
```
**Solusi:**
- Pastikan MetaMask extension terinstall
- Refresh halaman setelah install
- Coba browser lain (Chrome/Firefox)

### Wrong Network

```
❌ Error: Transaksi gagal atau contract tidak ditemukan
```
**Solusi:**
- Cek MetaMask → pastikan di Sepolia network
- Jika salah network, switch ke Sepolia

### Insufficient Funds

```
❌ Error: "insufficient funds for gas"
```
**Solusi:**
- Dapatkan test ETH dari faucet
- Minimal butuh ~0.001 ETH untuk transaksi

### Transaction Pending Lama

```
⏳ Status: Transaksi pending lebih dari 5 menit
```
**Solusi:**
- Cek di Etherscan apakah transaksi stuck
- Bisa speed up dengan gas price lebih tinggi
- Atau cancel dan buat transaksi baru

### CORS Error (jika pakai file://)

```
❌ Error: Cross-Origin Request Blocked
```
**Solusi:**
- Jangan buka file langsung (file://)
- Gunakan Live Server atau HTTP server

---

## 📖 Referensi

### Dokumentasi Resmi
- [MetaMask Developer Docs](https://docs.metamask.io/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Ethereum JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/)
- [Remix IDE Documentation](https://remix-ide.readthedocs.io/)

### Tools & Resources
- [Remix IDE](https://remix.ethereum.org/) - Online Solidity IDE
- [Sepolia Etherscan](https://sepolia.etherscan.io/) - Block Explorer
- [Chainlist](https://chainlist.org/) - Add networks ke MetaMask
- [Etherscan API Docs](https://docs.etherscan.io/) - API untuk fetch data

### Learning Resources
- [CryptoZombies](https://cryptozombies.io/) - Belajar Solidity dengan game
- [Ethereum.org Learn](https://ethereum.org/en/learn/) - Konsep dasar Ethereum
- [Alchemy University](https://university.alchemy.com/) - Kursus Web3 gratis

---

## ⚠️ Catatan Keamanan

| ⛔ JANGAN | ✅ LAKUKAN |
|-----------|-----------|
| Commit private key ke Git | Simpan private key offline |
| Gunakan mainnet untuk testing | Gunakan testnet (Sepolia) |
| Share secret phrase | Backup phrase di tempat aman |
| Trust website mencurigakan | Verifikasi URL sebelum connect |

---

## 👨‍💻 Credits

**Demo Praktikum Web3 & Smart Contract**  
Untuk Keperluan Edukasi - Pemrograman Web

---

<p align="center">
  <strong>Happy Coding!</strong> 🚀
  <br>
  <em>Built with ❤️ for Web3 Education</em>
</p>
