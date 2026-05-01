<div align="center">

<img src="https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square" />
<img src="https://img.shields.io/badge/Users-150%2B-blue?style=flat-square" />
<img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" />
<img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" />

# Postly

**A modern social platform built for seamless sharing, interaction, and connection.**

[Live App](https://postly-lake.vercel.app/) · [GitHub](https://github.com/Kaushalendra-Marcus/Postly) · [Report Bug](https://github.com/Kaushalendra-Marcus/Postly/issues) · [Request Feature](https://github.com/Kaushalendra-Marcus/Postly/issues)

</div>

---

## Overview

Postly is a full-stack social media platform built with production-grade tooling. Users can create posts, interact with others, upload media, and build their presence — all wrapped in a fast, responsive, accessible interface.

Currently live with **150+ active users**, real-time-like interactions, and continuous feature development.

---

## Screenshots

| Web | Mobile | Profile |
|-----|--------|---------|
| ![Web](https://github.com/user-attachments/assets/07bdf54e-3b30-485c-839f-2e70a4d72186) | ![Mobile](https://github.com/user-attachments/assets/3ddc0da3-5a71-4ac9-afd2-7b097667aee4) | ![Profile](https://github.com/user-attachments/assets/31f5558a-428e-4d65-8b8e-d693d6720119) |

---

## Features

### Authentication
- Secure sign-in via **Clerk** with Google and GitHub OAuth
- Protected routes and persistent session handling

### Social
- Create, publish, like, and reply to posts
- Share posts externally
- View profiles and posts from other users
- Smooth, real-time-like interactions

### Media
- Image and file uploads via **UploadThing**
- Secure, scalable upload pipeline

### UI / UX
- Clean interface built with **Shadcn UI** and **Radix UI**
- Fully responsive across all screen sizes
- Fluid animations powered by **Framer Motion**
- Accessible components throughout

### Analytics
- Privacy-friendly usage insights via **Vercel Analytics**

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS |
| **UI Components** | Shadcn UI, Radix UI, Framer Motion, Lucide React |
| **Backend** | Next.js App Router, Server Actions, API Routes |
| **Database** | MongoDB, Mongoose |
| **Auth** | Clerk, OAuth (Google, GitHub) |
| **Forms** | React Hook Form, Zod |
| **Uploads** | UploadThing |
| **Analytics** | Vercel Analytics |

---

## Project Structure

```
├── app/          # Next.js App Router — pages and layouts
├── components/   # Reusable UI components
├── lib/          # Utility functions and helpers
├── models/       # Mongoose schemas and models
├── actions/      # Server actions for backend logic
└── styles/       # Global styles and Tailwind config
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB URI (Atlas or local)
- Clerk account
- UploadThing account

### Local Setup

**1. Clone the repository**
```bash
git clone https://github.com/Kaushalendra-Marcus/Postly.git
cd Postly
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

MONGODB_URI=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

NEXT_PUBLIC_APP_URL=
```

**4. Start the development server**
```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Roadmap

- [ ] Follow / unfollow system
- [ ] Notifications
- [ ] Post discovery and explore feed
- [ ] Progressive Web App (PWA) support
- [ ] Performance optimizations

---

## Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change, then submit a pull request against the `main` branch.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

Built by [Kaushalendra Singh](https://github.com/Kaushalendra-Marcus)

</div>
