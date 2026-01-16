# 📖 STORYKU

A modern web application for creating, managing, and organizing your personal stories and journals. Write, edit, and share your narrative with a beautiful, intuitive interface.

**Live Demo:** [https://storyku-dun.vercel.app/](https://storyku-dun.vercel.app/dashboard)

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)

---

## <a name="introduction"></a> 🎯 Introduction

Storyku is a fullstack web application designed for story enthusiasts and journal writers. Whether you're documenting personal experiences, creative fiction, or daily reflections, Storyku provides a clean, modern platform to manage your narratives efficiently.

---

## <a name="features"></a> ✨ Features

- 📝 **Create Stories** - Write and publish new stories with rich text editing
- 📚 **Story Management** - View all your stories in an organized list
- 🔍 **Story Details** - Read complete story information and metadata
- ✏️ **Edit Stories** - Modify existing stories with full editing capabilities
- 📖 **Chapter Support** - Organize stories into multiple chapters
- 💾 **Draft System** - Save drafts before publishing
- 🎨 **Rich Text Editor** - TipTap-powered editor with formatting tools

---

## <a name="tech-stack"></a> 🛠️ Tech Stack

### Backend

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js 5.2+
- **Database:** PostgreSQL with Prisma ORM
- **ORM:** Prisma 6.19+
- **Authentication & Security:** Helmet, CORS
- **File Storage:** Vercel Blob
- **Testing:** Jest + Supertest
- **Database Adapter:** Neon Serverless Adapter

### Frontend

- **Library:** React 19.2+
- **Build Tool:** Vite 7.2+
- **Language:** TypeScript 5.9+
- **Styling:** Tailwind CSS 4.1+
- **UI Components:** shadcn/ui + Radix UI
- **Rich Text Editor:** TipTap
- **HTTP Client:** Axios
- **Router:** React Router 7.12+
- **Icons:** Lucide React, React Icons

---

## <a name="project-structure"></a> 📁 Project Structure

```
storyku/
├── backend/                          # Express.js backend server
│   ├── src/
│   │   ├── index.ts                  # Application entry point
│   │   ├── config/                   # Configuration settings
│   │   ├── controllers/              # Request handlers
│   │   │   └── story.controller.ts
│   │   ├── services/                 # Business logic
│   │   │   └── story.service.ts
│   │   ├── routes/                   # API routes
│   │   │   ├── index.ts
│   │   │   └── story.routes.ts
│   │   ├── middlewares/              # Express middlewares
│   │   │   ├── errorHandler.ts
│   │   │   └── notFoundHandler.ts
│   │   ├── lib/                      # Utilities and helpers
│   │   │   └── prisma.ts
│   │   ├── helper/                   # Helper functions
│   │   │   ├── convertEnum.ts
│   │   │   └── processString.ts
│   │   ├── utils/                    # Utility classes
│   │   │   ├── HttpException.ts
│   │   │   └── logger.ts
│   │   └── types/                    # TypeScript types
│   │       ├── index.ts
│   │       └── story.types.ts
│   ├── prisma/
│   │   ├── schema.prisma             # Database schema
│   │   └── migrations/               # Database migrations
│   ├── tests/                        # Test files
│   │   └── storyController.test.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.cjs
│
├── frontend/                         # React + Vite frontend
│   ├── src/
│   │   ├── main.tsx                  # React entry point
│   │   ├── App.tsx                   # Root component
│   │   ├── index.css                 # Global styles
│   │   ├── app/
│   │   │   ├── App.tsx
│   │   │   ├── dashboard/            # Dashboard page
│   │   │   └── story-management/     # Story management pages
│   │   │       ├── StoryManagement.tsx
│   │   │       ├── [id]/              # Story detail page
│   │   │       ├── add/               # Add story page
│   │   │       │   ├── AddStory.tsx
│   │   │       │   └── chapter/       # Add chapter page
│   │   │       └── edit/              # Edit story page
│   │   ├── components/
│   │   │   ├── common/               # Common components
│   │   │   │   ├── Layout.tsx
│   │   │   │   ├── AppSidebar.tsx
│   │   │   │   ├── BreaadCrumb.tsx
│   │   │   │   ├── ErrorPage.tsx
│   │   │   │   └── ActionButton.tsx
│   │   │   ├── story-management/     # Story-specific components
│   │   │   │   ├── FilterUI.tsx
│   │   │   │   └── TipTapToolbar.tsx
│   │   │   └── ui/                   # Reusable UI components
│   │   │       ├── button.tsx
│   │   │       ├── input.tsx
│   │   │       ├── textarea.tsx
│   │   │       ├── dropdown-menu.tsx
│   │   │       ├── sidebar.tsx
│   │   │       └── ... (more UI components)
│   │   ├── hooks/                    # Custom React hooks
│   │   │   ├── useStoryDraft.ts
│   │   │   ├── useStoryUpsert.ts
│   │   │   └── use-mobile.ts
│   │   ├── context/                  # React context
│   │   │   └── StoryDraftContext.tsx
│   │   ├── types/                    # TypeScript types
│   │   │   └── story.ts
│   │   ├── lib/                      # Utilities
│   │   │   └── utils.ts
│   │   ├── assets/                   # Static assets
│   │   └── public/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── eslint.config.js
│
└── README.md
```

---

## <a name="getting-started"></a> 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- PostgreSQL database
- (Optional) Vercel account for Blob storage

### Environment Variables

**Backend (.env):**

```env
DATABASE_URL=your_postgresql_url
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

**Frontend (.env):**

```env
VITE_API_URL=http://localhost:5000
```

---

## <a name="installation"></a> 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/rakafdil/storyku.git
cd storyku
```

### 2. Backend Setup

```bash
cd backend
npm install

# Setup database
npm run db:migrate

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Start development server
npm run dev
```

The application will be available at:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## <a name="available-scripts"></a> 📜 Available Scripts

### Backend

| Script                | Description                              |
| --------------------- | ---------------------------------------- |
| `npm run dev`         | Start development server with hot reload |
| `npm run build`       | Compile TypeScript to JavaScript         |
| `npm start`           | Run production build                     |
| `npm run lint`        | Run ESLint                               |
| `npm test`            | Run Jest tests                           |
| `npm run db:generate` | Generate Prisma client                   |
| `npm run db:push`     | Push schema changes to database          |
| `npm run db:migrate`  | Create and run migrations                |
| `npm run db:studio`   | Open Prisma Studio                       |

### Frontend

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run lint`    | Run ESLint               |
| `npm run preview` | Preview production build |

---

## Live Demo

Check out the live application: [https://storyku-dun.vercel.app/](https://storyku-dun.vercel.app/)

---


## 👨‍💻 Author

Created with ❤️ by [rakafdil](https://github.com/rakafdil)
