## Postly

Postly is a modern social media platform built to enable seamless sharing, interaction, and connection. It is designed as a full-stack learning project with production-grade tools, focusing on performance, scalability, authentication, and clean UI/UX.

The project is live, actively used, and continuously evolving.

## Screenshots

### Web Interface
<img width="1919" height="978" alt="image" src="https://github.com/user-attachments/assets/07bdf54e-3b30-485c-839f-2e70a4d72186" />

### Mobile View
<img width="420" height="970" alt="image" src="https://github.com/user-attachments/assets/3ddc0da3-5a71-4ac9-afd2-7b097667aee4" />

### Profile
<img width="461" height="973" alt="image" src="https://github.com/user-attachments/assets/31f5558a-428e-4d65-8b8e-d693d6720119" />

## Live Links

- **Web App**: https://postly-lake.vercel.app/
- **GitHub Repository**: https://github.com/Kaushalendra-Marcus/Postly

## Current Status

- Live in production
- 150+ active users
- Multiple posts created by users
- Authentication, posting, uploads, and analytics fully functional

## Features

### Authentication
- Secure authentication using Clerk
- Supports Google and GitHub OAuth
- Session handling and protected routes

### Social Features
- Create and publish posts
- Like post of others
- Reply on other's post
- Sharing option, share to the world
- View posts from other users
- User profiles with authentication-based identity
- Real-time-like smooth interactions using modern UI patterns

### Media Uploads
- File and image uploads using UploadThing
- Secure and scalable upload handling

### UI and UX
- Clean and modern interface built with Shadcn UI
- Fully responsive design
- Smooth animations using Framer Motion
- Accessible components powered by Radix UI

### Analytics
- Integrated Vercel Analytics
- Privacy-friendly insights on usage and performance

## Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI
- Radix UI
- Framer Motion
- Lucide React
- React Icons

### Backend
- Next.js App Router
- MongoDB
- Mongoose
- Server Actions and API Routes

### Authentication
- Clerk
- OAuth (Google, GitHub)

### Forms and Validation
- React Hook Form
- Zod

### Uploads
- UploadThing

### Analytics
- Vercel Analytics

## Dependencies

### Main Dependencies
```
@clerk/nextjs
@clerk/themes
@hookform/resolvers
@radix-ui/react-label
@radix-ui/react-slot
@radix-ui/react-tabs
@uploadthing/react
@vercel/analytics
class-variance-authority
clsx
framer-motion
lucide-react
mongoose
next
react
react-dom
react-hook-form
react-icons
svix
tailwind-merge
tailwindcss-animate
uploadthing
zod
```

### Development Dependencies
```
@tailwindcss/postcss
@types/node
@types/react
@types/react-dom
autoprefixer
postcss
tailwindcss
typescript
```

## Project Structure (High Level)
```
app/           – Next.js App Router pages and layouts
components/    – Reusable UI components
lib/           – Utility functions and helpers
models/        – Mongoose schemas and models
actions/       – Server actions for backend logic
styles/        – Global styles and Tailwind configuration
```

## Environment Variables

To run this project locally, you need the following environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

MONGODB_URI=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

NEXT_PUBLIC_APP_URL=
```

You may also need additional Clerk webhook or OAuth configuration depending on your setup.

## Getting Started Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kaushalendra-Marcus/Postly.git
   cd Postly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file and add the required keys.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   Visit `http://localhost:3000` in your browser.

## Learning Goals Behind Postly

Postly is built as a learning-focused yet production-ready project to:

- Understand modern Next.js App Router patterns
- Implement real authentication using OAuth
- Design scalable MongoDB schemas
- Build accessible UI with Radix and Shadcn
- Handle uploads and analytics in real-world apps
- Write clean, maintainable TypeScript code

## Future Improvements

- Likes, comments, and post interactions
- Follow system
- Notifications
- Better post discovery
- Performance optimizations
- Progressive Web App improvements

---

