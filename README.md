# 🎨 Art NFT Marketplace

Welcome to **Art NFT Marketplace**, a full-stack decentralized application (dApp) that lets artists mint, list, and sell their artwork as NFTs on the blockchain.

Built with ❤️ by **Priyanshu Aryan**.

---

## 🌐 Live Preview (Optional)
> Coming soon — [yourdomain.com](https://yourdomain.com)

---

## 🚀 Features

- ✅ Upload artwork to IPFS
- ✅ Mint ERC-721 NFTs
- ✅ List NFTs for sale on the marketplace
- ✅ Buy NFTs using MATIC (Polygon)
- ✅ Fully decentralized backend (Solidity + IPFS)
- ✅ Web3 wallet integration via Web3Modal

---

## 🏗️ Tech Stack

| Layer       | Tech                        |
|-------------|-----------------------------|
| 💻 Frontend | Next.js, React, Tailwind CSS |
| ⚙️ Backend  | Solidity, Hardhat, IPFS      |
| 🔗 Web3     | Ethers.js, Web3Modal         |
| 🛠 Infra     | Infura, Metamask, Polygon Mumbai |

---

## 📂 Folder Structure

```
art-nft-marketplace/
├── contracts/            # Solidity Smart Contracts
│   ├── NFT.sol
│   └── Marketplace.sol
├── pages/                # Frontend Pages (Next.js)
│   └── index.js
├── scripts/              # Hardhat deployment scripts
│   └── deploy.js
├── hardhat.config.js     # Hardhat network config
├── README.md
├── .gitignore
└── package.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Compile contracts

```bash
npx hardhat compile
```

### 3️⃣ Deploy to local or Mumbai testnet

```bash
# Local
npx hardhat run scripts/deploy.js --network hardhat

# Mumbai
npx hardhat run scripts/deploy.js --network mumbai
```

Replace contract addresses in `pages/index.js` after deployment.

### 4️⃣ Run Frontend

```bash
npm run dev
```

---

## 🔐 Environment Variables (Optional)

Create a `.env` file for your Mumbai deployment:

```env
PRIVATE_KEY=your_private_key
INFURA_API_KEY=your_infura_key
```

---

## ✨ Screenshots

| Mint NFT UI | NFT Listing Page |
|-------------|------------------|
| Coming soon | Coming soon      |

---

## 📄 License

MIT License

---


---

> ⚡ Drop a ⭐ if you like this project and want to support it!
