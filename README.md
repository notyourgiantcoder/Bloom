<div align="center">

<img src="public/Screenshot 2026-08-26 203145.png" alt="Bloom" width="260"/>

### Full-Stack Educational Platform

A modern full-stack learning platform built with **Next.js, React, TypeScript, and Supabase**.

<br/>

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge\&logo=next.js\&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge\&logo=supabase\&logoColor=3ECF8E)

</div>

---

# 🌱 About Bloom

**Bloom** is a full-stack educational platform designed to provide a centralized environment for learning, course creation, user management, and educational content delivery.

The application combines a modern **Next.js frontend and backend** with **Supabase for authentication and data management**, providing a complete web application rather than a standalone frontend.

The platform includes:

* 🎓 Course browsing and learning
* 📝 Course creation and management
* 👤 User authentication
* 📊 Personalized dashboard
* 🎨 AI Studio interface
* 🏠 User onboarding
* 💳 Pricing and subscription interface
* 👥 Community functionality
* ⚙️ User settings
* 🔌 Server-side API functionality
* 🗄️ Supabase database integration

---

# ✨ Features

## 🎓 Course Platform

Bloom provides users with an end-to-end learning experience.

Users can:

* Browse available courses
* Access course content
* Navigate structured learning material
* Create and manage courses
* Access their personalized dashboard

---

## 📝 Course Builder

The Course Builder provides an interface for creating and structuring educational courses.

It is designed to allow content creators to organize their learning material in a structured and user-friendly workflow.

---

## 📊 Dashboard

The dashboard acts as the central workspace for users.

It brings together:

* Learning activity
* Courses
* AI Studio
* Analytics
* Community
* Account settings

---

## 🔐 Authentication

Bloom uses **Supabase Authentication** for secure user authentication.

Supported authentication flows include:

* Email & password
* Google authentication
* OAuth callback handling
* Session management

Authentication-related functionality is handled through the Next.js application and Supabase.

---

## 🎨 AI Studio

Bloom includes an **AI Studio interface** within the dashboard.

The AI Studio is structured as a dedicated workspace within the application and provides the foundation for AI-powered educational functionality.

> The current repository focuses on the full-stack Bloom application and its working product functionality.

---

# 🏗️ Architecture

Bloom follows a full-stack Next.js architecture.

```text
                    ┌──────────────────────┐
                    │        User          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Bloom Frontend    │
                    │   Next.js + React    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Next.js Backend    │
                    │   API / Server Logic │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
                    ▼                      ▼
          ┌──────────────────┐   ┌──────────────────┐
          │     Supabase     │   │   Application    │
          │                  │   │     Services     │
          │ • Authentication │   │ • Server Actions│
          │ • PostgreSQL     │   │ • API Routes    │
          │ • Data Storage   │   │ • Business Logic│
          └──────────────────┘   └──────────────────┘
```

---

# 📁 Project Structure

```text
HalewoodsInternship/
│
├── bloom/                           # Bloom Full-Stack Application
│   │
│   ├── app/                         # Next.js App Router
│   │   │
│   │   ├── api/                    # API routes
│   │   │
│   │   ├── auth/                   # Authentication flows
│   │   │
│   │   ├── dashboard/              # User dashboard
│   │   │   ├── ai-studio/          # AI Studio interface
│   │   │   │   ├── components/
│   │   │   │   ├── actions.ts
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── ...
│   │   │
│   │   ├── course-builder/         # Course creation
│   │   ├── courses/                # Course content
│   │   ├── onboarding/             # User onboarding
│   │   ├── pricing/                # Pricing page
│   │   ├── sign-in/                # Sign-in
│   │   └── ...
│   │
│   ├── lib/
│   │   └── supabase/               # Supabase clients
│   │       ├── browser-client.ts
│   │       └── server-client.ts
│   │
│   ├── next.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── supabase/                       # Database configuration
│   └── render_jobs.sql
│
├── assets/
│   └── bloom-logo.png              # Bloom logo
│
└── README.md
```

---

# 🧩 Application Structure

## `bloom/`

The `bloom/` directory contains the complete full-stack application.

It includes both the **frontend interface and backend functionality** within the Next.js application.

### Frontend

Built using:

* Next.js
* React
* TypeScript
* Next.js App Router

### Backend

The backend functionality is implemented using:

* Next.js API Routes
* Server Actions
* Server-side components
* Supabase server client
* Application-level business logic

This allows the application to maintain a unified full-stack architecture without requiring a separate backend server.

---

# 🗺️ Main Routes

| Route                  | Description         |
| ---------------------- | ------------------- |
| `/`                    | Bloom landing page  |
| `/dashboard`           | Main user dashboard |
| `/dashboard/ai-studio` | AI Studio           |
| `/course-builder`      | Course creation     |
| `/courses/anatomy`     | Course content      |
| `/pricing`             | Pricing             |
| `/onboarding`          | User onboarding     |
| `/sign-in`             | User authentication |

---

# 🔐 Authentication Architecture

The authentication flow is integrated directly into the Next.js application.

```text
                    User
                      │
             ┌────────┴────────┐
             │                 │
       Email/Password       Google OAuth
             │                 │
             └────────┬────────┘
                      │
                      ▼
              Supabase Auth
                      │
                      ▼
                User Session
                      │
                      ▼
              Bloom Dashboard
```

Supabase handles authentication and session management while the Next.js application controls the authenticated user experience.

---

# 🗄️ Database

Bloom uses **Supabase** as its backend database and authentication platform.

The database layer is responsible for storing and managing application data such as:

* User information
* Course data
* Application records
* Render/job-related records
* Other platform-specific data

Supabase clients are separated into browser and server implementations:

```text
lib/
└── supabase/
    ├── browser-client.ts
    └── server-client.ts
```

This separation allows database operations to be performed appropriately depending on whether the code is executing on the client or server.

---

# 🔄 Application Flow

A typical authenticated user journey looks like:

```text
            Landing Page
                 │
                 ▼
          Authentication
                 │
                 ▼
             Onboarding
                 │
                 ▼
            Dashboard
                 │
       ┌─────────┼─────────┐
       │         │         │
       ▼         ▼         ▼
    Courses   AI Studio  Analytics
       │
       ▼
 Course Builder
       │
       ▼
 Course Content
```

---

# 🛠️ Tech Stack

| Layer           | Technology                          |
| --------------- | ----------------------------------- |
| Framework       | Next.js                             |
| Frontend        | React                               |
| Language        | TypeScript                          |
| Backend         | Next.js API Routes & Server Actions |
| Database        | Supabase / PostgreSQL               |
| Authentication  | Supabase Auth                       |
| Styling         | Project-specific UI system          |
| Package Manager | npm                                 |

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* A Supabase project

---

## 1. Clone the Repository

```bash
git clone <repository-url>
cd HalewoodsInternship
```

---

## 2. Navigate to Bloom

```bash
cd bloom
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Create a local environment file:

```bash
cp .env.example .env.local
```

Configure the required Supabase credentials and other application variables.

> Never commit `.env.local` or production credentials to the repository.

---

## 5. Start the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🔒 Environment Variables

Environment-specific configuration should be stored in:

```text
bloom/.env.local
```

Depending on the application configuration, this may include:

```text
Supabase URL
Supabase Anon Key
Application configuration
Other environment-specific values
```

Keep all secrets outside version control.

---

# 📐 Engineering Approach

Bloom follows a few core architectural principles.

### Full-Stack by Design

Frontend and backend functionality are maintained within the same Next.js application, reducing unnecessary infrastructure and keeping the application cohesive.

### Component-Based Architecture

Reusable React components are used throughout the platform to maintain consistency and simplify development.

### Server/Client Separation

Supabase clients and application logic are separated based on whether functionality executes on the browser or server.

### Modular Application Structure

Features such as the dashboard, course builder, authentication, and AI Studio are organized into independent application areas, making the codebase easier to maintain and extend.

### Scalable Foundation

The current architecture provides a foundation for adding additional educational features, integrations, and services without restructuring the core application.

---

# 🔮 Future Scope

The platform can be extended with features such as:

* Personalized learning experiences
* Advanced learning analytics
* Course recommendations
* Assessments and quizzes
* Progress tracking
* Instructor analytics
* Community improvements
* Additional content-management functionality
* Third-party educational integrations

---

# 👨‍💻 Project

**Bloom**

A full-stack educational platform developed as part of the **Halewoods Internship Project**.

---

<div align="center">

### 🌱 Learn. Create. Bloom.

</div>
