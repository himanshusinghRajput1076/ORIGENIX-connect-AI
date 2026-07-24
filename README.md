# 🚀 Origenix Connect AI

**AI-Powered Investor & Startup Intelligence Platform**

Discover investors, founders, VCs, startups, and companies with AI-driven lead scoring, real-time data pipelines, and intelligent outreach generation.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/himanshusinghrajput1076s-projects/origenix-automation)

---

## ✨ Features

- **Real-Time Data Pipeline** — Live investor/founder data from GitHub API, public registries, and Firestore
- **AI Lead Scoring** — Intelligent scoring with hot/warm/cold classification
- **Smart Search** — Search across investors, founders, companies with multi-filter support
- **AI Outreach Studio** — Generate personalized outreach messages
- **Analytics Dashboard** — Funding trends, deal flow, and industry distribution charts
- **Firebase Integration** — Firestore for real-time data, Firebase Auth for authentication

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, Framer Motion, Recharts |
| **Backend** | Express.js, TypeScript |
| **Database** | Firebase Firestore (real-time) |
| **Auth** | Firebase Authentication |
| **AI** | Google Gemini API |
| **Deployment** | Vercel |
| **Monorepo** | Turborepo + pnpm |

## 📁 Project Structure

```
origenix-connectai/
├── apps/
│   ├── web/          # Next.js 16 main web app
│   ├── api/          # Express.js API server
│   ├── admin/        # Admin dashboard
│   └── worker/       # Background worker
├── packages/
│   ├── shared/       # Shared types, validation, data providers
│   ├── ai/           # AI/ML integration
│   ├── auth/         # Authentication
│   ├── config/       # Configuration
│   ├── database/     # Firebase Admin SDK
│   ├── analytics/    # Analytics
│   ├── crm/          # CRM module
│   ├── notifications/# Notifications
│   └── search/       # Search engine
└── infrastructure/   # Deployment configs
```

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase credentials

# Run development server
pnpm dev

# Build for production
pnpm build
```

## 🔧 Environment Variables

Copy `.env.example` and fill in your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

## 👨‍💻 Author

**Himanshu Singh** — Founder & Tech Lead  
[LinkedIn](https://www.linkedin.com/in/himanshusingh88) | [GitHub](https://github.com/himanshusinghRajput1076)

## 📄 License

MIT © Origenix Connect AI
