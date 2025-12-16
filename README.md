# Web3 MetaMask Demo

Demo aplikasi Web3 untuk praktikum pemrograman web dengan fitur koneksi MetaMask wallet dan Sepolia Testnet.

## 📁 Struktur Folder

```
web3/
├── index.html          # File HTML utama
├── css/
│   └── custom.css      # Custom styles & animasi
├── js/
│   └── wallet.js       # JavaScript untuk wallet management
├── assets/             # Folder untuk gambar/icon (opsional)
└── README.md           # Dokumentasi project
```

## 🚀 Tech Stack

- **HTML5** - Struktur halaman
- **Tailwind CSS (CDN)** - Styling utility-first framework
- **Vanilla JavaScript** - Logika wallet management (ES6+)
- **Font Awesome** - Icons
- **Web3.js / Ethereum** - Blockchain interaction via MetaMask

## 📋 Fitur

- ✅ Connect/Disconnect MetaMask wallet
- ✅ Menampilkan alamat wallet
- ✅ Deteksi jaringan (Sepolia, Mainnet, dll)
- ✅ Menampilkan saldo ETH
- ✅ Responsive design (mobile-friendly)
- ✅ Auto-detect perubahan akun & jaringan
- ✅ Error handling & validasi

## 🛠️ Cara Menjalankan

1. **Install MetaMask**
   - Download extension MetaMask dari [metamask.io](https://metamask.io/download/)
   - Buat akun baru atau import existing wallet

2. **Setup Sepolia Testnet**
   - Buka MetaMask → Settings → Networks → Add Network
   - Atau gunakan [Chainlist.org](https://chainlist.org) untuk auto-add Sepolia

3. **Dapatkan Test ETH**
   - Kunjungi [Google Cloud Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
   - Atau faucet lain: [sepoliafaucet.com](https://sepoliafaucet.com)

4. **Jalankan Project**
   ```bash
   # Cara 1: Buka langsung file
   # Double click index.html di file explorer
   
   # Cara 2: Menggunakan Live Server (VS Code)
   # Install extension "Live Server"
   # Right click index.html → Open with Live Server
   
   # Cara 3: Python Simple HTTP Server
   python -m http.server 8000
   # Buka http://localhost:8000
   ```

## 🎨 Customization

### Mengubah Warna Tema
Edit [index.html](index.html) di bagian Tailwind config atau gunakan custom CSS di [css/custom.css](css/custom.css)

### Menambah Fitur Wallet
Edit [js/wallet.js](js/wallet.js) - semua logika wallet management ada di class `WalletManager`

## 📚 Pembelajaran

Project ini cocok untuk belajar:
- Integrasi Web3 dengan website tradisional
- Interaksi dengan MetaMask wallet
- Event handling Ethereum provider
- Responsive design dengan Tailwind CSS
- Clean code organization (separation of concerns)

## ⚠️ Catatan Penting

- **JANGAN** pernah commit private key atau secret recovery phrase
- Project ini untuk **TESTNET** saja (Sepolia)
- Jangan gunakan wallet mainnet untuk testing
- Simpan secret phrase di tempat aman offline

## 📖 Referensi

- [MetaMask Docs](https://docs.metamask.io/)
- [Ethereum JavaScript API](https://ethereum.org/en/developers/docs/apis/javascript/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Sepolia Testnet Info](https://sepolia.dev/)

## 👨‍💻 Developer

Demo Praktikum Web3 - Untuk Keperluan Edukasi  
Asisten Praktikum Pemrograman Web

---

**Happy Coding!** 🚀
