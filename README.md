# <p align="center">⚡ Simple Storage DApp ⚡</p>
<p align="center">
  <img src="https://img.shields.io/badge/Web3-Modern-0052FF?style=for-the-badge&logo=ethereum&logoColor=FFD700" />
  <img src="https://img.shields.io/badge/Network-Sepolia_Testnet-FFD700?style=for-the-badge&logo=chainlink&logoColor=0052FF" />
</p>

---

## 💎 Elevating Web3 Development
Selamat datang di **Simple Storage DApp**, sebuah platform demonstrasi *Decentralized Application* (DApp) yang dirancang khusus untuk praktikum pemrograman modern. Rasakan pengalaman langsung berinteraksi dengan **Ethereum Blockchain** melalui antarmuka yang intuitif.

### 🎨 Tech Palette
* **Core Engine:** [Solidity v0.8.19](https://soliditylang.org/)
* **Logic Layer:** Vanilla JavaScript (ES6+)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Cyberpunk Yellow/Blue Theme)
* **Gateway:** [MetaMask](https://metamask.io/)

---

## 🚀 Fitur Utama (The Powerhouse)

| Feature | Description | Status |
| :--- | :--- | :--- |
| 🔌 **Wallet Sync** | Koneksi instan dengan MetaMask Wallet | **LIVE** |
| 💰 **Balance Tracker** | Pantau saldo Sepolia ETH secara real-time | **LIVE** |
| 📖 **Smart Fetch** | Membaca data dari Blockchain (Tanpa Gas!) | **LIVE** |
| ✍️ **Chain Write** | Mengukir angka baru ke dalam Smart Contract | **LIVE** |
| 📜 **Audit Trail** | Riwayat transaksi langsung dari Etherscan API | **LIVE** |

---

## 🏗️ Arsitektur Sistem

> [!TIP]
> **Simple Storage** menggunakan pola arsitektur *Serverless Blockchain*, di mana database tradisional digantikan oleh *Smart Contract* yang bersifat *immutable*.

```mermaid
graph LR
    A[Frontend UI] -- eth_requestAccounts --> B(MetaMask)
    B -- Sign Transaction --> C{Sepolia Network}
    C -- eth_call --> D[Smart Contract]
    C -- Event Log --> E[Etherscan API]
    E -- JSON Response --> A
    style A fill:#0052FF,stroke:#FFD700,stroke-width:2px,color:#fff
    style B fill:#FFD700,stroke:#0052FF,stroke-width:2px,color:#000
    style D fill:#0052FF,stroke:#FFD700,stroke-width:4px,color:#fff
