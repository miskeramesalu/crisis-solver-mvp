# 🌍 Crisis Solver MVP

**Decentralized AI-Powered Social Impact Platform Built on Hedera Hashgraph**

> “Every action you take helps solve a crisis.”  
> — _Crisis Solver Vision Statement_

---

## 📖 1. Overview

**Crisis Solver** is a **decentralized humanitarian platform** that empowers people to _earn, support, and heal the world_.  
By combining **AI, blockchain transparency, gamification, and micro-donations**, the app connects donors, users, and organizations in real time to tackle crises like **hunger, health emergencies, and displacement**.

## This **MVP (Minimum Viable Product)**, built for the **Hedera Africa Hackathon**, demonstrates how social engagement can directly contribute to real-world humanitarian impact through the **Hedera Testnet**.

## 🎯 2. Goals and Objectives

| Objective                              | Description                                                                      |
| -------------------------------------- | -------------------------------------------------------------------------------- |
| 🌐 Build an inclusive digital platform | Connect people in crisis with global donors and supporters                       |
| 💰 Empower users                       | Earn HBAR tokens by performing crisis-solving digital actions                    |
| 🧠 Educate and engage                  | Encourage awareness through quizzes, games, and videos                           |
| 🔍 Ensure transparency                 | Use Hedera Token Service (HTS) & Hedera Consensus Service (HCS) for auditability |
| 🤝 Collaborate globally                | Partner with NGOs, UN agencies, and ethical tech firms                           |

---

## 💡 3. Concept Summary

| User Action                 | Reward                  | Global Impact       |
| --------------------------- | ----------------------- | ------------------- |
| Upload crisis videos/images | Small tokens            | Raises awareness    |
| View or share crisis media  | Small tokens            | Expands reach       |
| Play “Crisis Solve” games   | Tokens or points        | Promotes empathy    |
| Donate via app              | Tokenized HBAR donation | Provides direct aid |
| Invite others (referral)    | Referral bonus          | Grows community     |
| Complete surveys/quizzes    | Tokens                  | Promotes knowledge  |

---

## ⚙️ 4. System Architecture

```
Hedera Africa Projects
│
└── crisis-solver-mvp/
    ├── backend/
    │   ├── src/
    │   │   ├── server.js          # Express API server
    │   │   ├── hederaService.js   # Hedera SDK integration (HTS/HCS)
    │   │   ├── config.js          # Configuration loader
    │   │   └── .env               # Environment variables
    │   └── package.json
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── components/        # Dashboard, Quiz, Game, Donation, etc.
    │   │   ├── assets/Logo.png    # App logo
    │   │   ├── api.js             # Frontend API integration
    │   │   ├── App.js             # Main React app
    │   │   ├── index.js           # React entry file
    │   │   └── index.css          # Tailwind styling
    │   ├── public/
    │   │   └── index.html
    │   ├── tailwind.config.js
    │   ├── postcss.config.js
    │   └── package.json
    │
    └── README.md
```

---

## 🧩 5. Tech Stack

| Layer               | Technology                                  |
| ------------------- | ------------------------------------------- |
| **Frontend**        | React.js, Tailwind CSS                      |
| **Backend**         | Node.js, Express.js                         |
| **Blockchain**      | Hedera Hashgraph (HTS, HCS)                 |
| **Database**        | MongoDB Atlas                               |
| **Hosting**         | Vercel (Frontend), Render/Railway (Backend) |
| **AI & Engagement** | ChatGPT API (future integration)            |
| **Payments**        | HBAR Tokens, optional PayPal/Flutterwave    |
| **Security**        | JWT, dotenv, HTTPS                          |

---

## 🔐 6. Hedera Integration

### 🪙 Hedera Token Service (HTS)

Used to create, mint, and distribute **CrisisSolver Tokens (CST)** that reward users for digital engagement or donations.

### 🧾 Hedera Consensus Service (HCS)

Ensures all transactions and donation logs are **publicly verifiable** and **tamper-proof**.

### ⚙️ .env Configuration Example

```bash
# Backend Environment
REACT_APP_API_URL=http://localhost:4000/api
PORT=4000
MONGO_URI=mongodb+srv://miskera22_db_user:NjoSNOpO870cQbCZ@crisissolvercluster.wz9ccsw.mongodb.net/crisisSolverDB?retryWrites=true&w=majority&tls=true&appName=CrisisSolverCluster
MONGO_DB_NAME=crisisSolverDB

# Hedera Testnet ED25519 account
HEDERA_NETWORK=testnet
HEDERA_ACCOUNT_ID=0.0.7157048
HEDERA_PRIVATE_KEY=0x096b0ae3814723c7b23c7674ef339c4d77b109cb2957cb4e4851fa67db3d1441
# Frontend API Link
REACT_APP_API_URL=http://localhost:4000/api
```

---

## 🧠 7. Frontend Tabs Overview

| Tab                | Purpose                                       |
| ------------------ | --------------------------------------------- |
| 🏠 **Dashboard**   | Overview of stats and token balances          |
| ❓ **Quiz**        | AI-driven awareness and crisis education      |
| 🎮 **Game**        | Mini games rewarding impact tokens            |
| 💸 **Donation**    | Token-based donation to verified causes       |
| 📢 **Media**       | Upload and view verified crisis videos/images |
| 🧾 **Referral**    | Invite users and earn community rewards       |
| 🏆 **Leaderboard** | Shows top contributors and donors             |

---

## 🔧 8. Setup & Installation

### 🧱 Backend Setup

```bash
cd crisis-solver-mvp/backend
npm install
npm run dev
```

### 🌐 Frontend Setup

```bash
cd ../frontend
npm install
npm start
```
## 📡 9. API Overview

| Endpoint               | Method | Description               |
| ---------------------- | ------ | ------------------------- |
| `/api/media`           | GET    | Fetch all media           |
| `/api/upload`          | POST   | Upload crisis media       |
| `/api/view`            | POST   | Record view & reward user |
| `/api/answer`          | POST   | Submit quiz answers       |
| `/api/game/complete`   | POST   | Submit game score         |
| `/api/donate`          | POST   | Donate to verified cause  |
| `/api/referral`        | POST   | Register a referral       |
| `/api/leaderboard`     | GET    | Get leaderboard data      |
| `/api/userBalance/:id` | GET    | Fetch user balance        |

---

## 🌱 10. Sustainability Model

Revenue and donation funding come from:

- Ad views and sponsored content
- NGO and UN partnerships
- Gamified campaigns (sponsors pay per view or play)
- Optional 2% service fee for transparency operations
- Crowdfunding and memberships

Funds are divided into:

1. **User Rewards Pool** – Tokens distributed to users
2. **Crisis Support Fund** – Donations sent to verified organizations

---

## 🧭 11. Governance & Ethics

| Policy               | Description                                          |
| -------------------- | ---------------------------------------------------- |
| 🕊️ Transparency      | All donations & transactions traceable on blockchain |
| 🤖 Verification      | AI & human moderation of crisis content              |
| 💬 Humanity          | Operate under ethics of compassion & unity           |
| 💳 Financial Clarity | Clear token and payout structure                     |
| 🔐 Privacy           | User data encrypted & protected                      |

---

## 🤝 12. Collaborators & Partners

Potential partners:

- **UNHCR**, **WFP**, **WHO**, **UNICEF**
- **Red Cross**, **Save the Children**, **World Vision**
- **Hedera**, **IBM**, **Google**, **Flutterwave**
- **Faith-based and community organizations**

---

## 🔮 13. Future Roadmap

| Phase      | Description                                          |
| ---------- | ---------------------------------------------------- |
| ✅ MVP     | Functional Testnet demo (PoC)                        |
| 🔜 Phase 2 | Integrate AI moderation and verification             |
| 🔜 Phase 3 | Pilot with NGOs on Hedera Mainnet                    |
| 🔜 Phase 4 | Add mobile app (React Native)                        |
| 🔜 Phase 5 | Enable decentralized ID (DID) & multilingual support |

---

## 👨‍💻 14. Developer

**👤 Misker Amesalu Mulu**  
Founder • Full Stack Developer •IBM Certified Developer.Software Engineer. Coffee & Blockchain Innovator  
📍 Ethiopia  
✉️ miskera22@gmail.com  
💬 “Building a world where compassion, transparency, and technology solve crises together.”

---

## 📜 15. License

Licensed under the **MIT License**.  
You are free to use, modify, and distribute this project with attribution.

---

## 🌐 16. Acknowledgments

- **Hedera Hashgraph** — for decentralized trust infrastructure
- **DoraHacks & Hedera Africa Hackathon** — for empowering African innovators
- **All open-source contributors** enabling social tech solutions

---

# 💫 “Crisis Solver — Earn • Support • Heal the World”

 <!--  -->

## 🌐 . Pitch Deck and Certification Links

**Pitch Deck link**=https://www.canva.com/design/DAG3Sy8ri9A/5h3pms0c71-kYMBCpKhbyg/edit?utm_content=DAG3Sy8ri9A&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

**certification link**=https://certs.hashgraphdev.com/32630e03-32bf-4751-8cca-832a7de4e7cf.pdf
