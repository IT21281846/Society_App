# Society

# 🏘️ Society Management System

A full-stack web application for managing society members, payments, and admin operations — built with **React + Node.js + Express + PostgreSQL** using **Prisma ORM**.

---

## 🚀 Features

### 👤 Authentication & Roles
- User registration & login with JWT
- Role-based access (`ADMIN` / `MEMBER`)
- Protected routes for admins only

### 🧭 Member Features
- View profile details
- Check monthly payment status

### 🛠️ Admin Features
- Manage users and their roles
- Track and update payments
- Access admin-only dashboard

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React, TypeScript, TailwindCSS |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Auth** | JWT-based Authentication |
| **Deployment** | AWS / Render / Railway (optional) |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

git clone https://github.com/your-username/society-management.git
cd society-management

### 2️⃣ Backend setup
cd society-backend
npm install
npx prisma migrate dev
npm run dev

### 3️⃣ Frontend setup
cd society-frontend
npm install
npm run dev

Environment Variables

In society-backend/.env:

DATABASE_URL=postgresql://user:password@localhost:5432/societydb
JWT_SECRET=your_secret_key