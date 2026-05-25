# NoteTake — A Modern Rich-Text Notes App

A full-stack notes application with a rich-text editor, real-time collaboration via share links, and a clean editorial design. Built with **Next.js 16**, **Tiptap v3**, **Express**, and **MongoDB**.

---

## Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 |
| Editor     | Tiptap v3 (ProseMirror-based rich-text editor) |
| State      | Zustand |
| Backend    | Express.js, TypeScript |
| Database   | MongoDB + Mongoose |
| Auth       | JWT (access + HTTP-only refresh tokens), Google OAuth |
| Animations | GSAP |
| Export     | Markdown (turndown), PDF (html2pdf.js) |

---

## Features

### Editor
- Rich-text editing with **bold**, *italic*, underline, strikethrough, inline code
- **Headings** (H1–H3), bullet lists, ordered lists, task lists
- **Blockquotes**, code blocks with syntax highlighting
- **Tables**, images, links, horizontal rules
- **Floating toolbar** appears on double-click above the cursor
- **Text selection bubble menu** with formatting options
- **Auto-save** with 2s debounce and visual status indicator
- **Word count** and estimated reading time in the status bar

### Notes Management
- Create, edit, delete (soft-delete with trash), and restore notes
- Search notes by title/content
- Filter: All, Private, Shared, Pinned
- **Date-grouped sidebar** (Today, Yesterday, This Week, This Month, Older)
- **Drag-resizable sidebar** with collapsible toggle
- Mobile-responsive drawer layout

### Sharing
- **Shareable links** with view/comment modes
- Public viewer page at `/s/[token]`
- Toggle privacy per note (private vs. shared)

### Export
- **Export as Markdown** — downloads a `.md` file
- **Export as PDF** — generates a clean A4 PDF via html2pdf

### Auth
- Email/password registration and login
- Google OAuth
- JWT access tokens (15 min) with HTTP-only refresh cookies (7 days)
- Persistent sessions across page reloads

### UX
- Light/dark theme toggle with system preference detection
- **GSAP page transitions** for smooth navigation
- Responsive design — full app on desktop, drawer sidebar on mobile
- Editorial design with Lora (serif body), DM Mono (UI labels), Playfair Display (display headings)

---

## Project Structure

```
noted-/
├── backend/                  # Express API server
│   ├── src/
│   │   ├── controllers/      # Route handlers (auth, notes, media, share)
│   │   ├── middleware/       # Auth guard, rate limiter, error handler
│   │   ├── models/           # Mongoose schemas (User, Note, MediaAsset, ShareLink)
│   │   ├── routes/           # Express router definitions
│   │   ├── services/         # Business logic (email, media)
│   │   └── index.ts          # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                 # Next.js 16 client
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   │   ├── app/          # Authenticated app pages
│   │   │   │   ├── note/[id]/ # Editor page
│   │   │   │   └── page.tsx  # Notes list / home
│   │   │   ├── login/        # Login page
│   │   │   ├── register/     # Register page
│   │   │   ├── s/[token]/    # Shared note viewer
│   │   │   └── page.tsx      # Landing page
│   │   ├── components/
│   │   │   ├── editor/       # Tiptap editor, ExportDropdown, BubbleMenu, image upload
│   │   │   ├── landing/      # Landing page sections (Hero, Features, CTA, etc.)
│   │   │   ├── notes/        # NoteCard, NoteList
│   │   │   ├── share/        # SharePopover
│   │   │   └── ui/           # TopNav, TransitionLayout
│   │   └── lib/              # Utilities, API client, Zustand stores, theme hook
│   ├── package.json
│   └── next.config.ts
│
├── design-system/            # Figma design assets and specs
└── .opencode/                # AI skill definitions for development
```

---

## Getting Started

### Prerequisites

- **Node.js 20** (v20.20.1+)
- **MongoDB** — local or Atlas (pre-configured connection string in `.env`)
- **npm**

### Backend Setup

```bash
cd backend
cp .env.example .env   # edit with your values
npm install
npm run dev            # starts on http://localhost:4000
```

Required environment variables (`backend/.env`):

| Variable               | Description |
|------------------------|-------------|
| `PORT`                 | Server port (default: 4000) |
| `MONGODB_URI`          | MongoDB connection string |
| `JWT_SECRET`           | Secret for signing access tokens |
| `JWT_REFRESH_SECRET`   | Secret for signing refresh tokens |
| `JWT_EXPIRES_IN`       | Access token TTL (e.g. 15m) |
| `JWT_REFRESH_EXPIRES_IN`| Refresh token TTL (e.g. 7d) |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID (optional) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret (optional) |
| `CLIENT_URL`           | Frontend URL for CORS (default: http://localhost:3000) |

### Frontend Setup

```bash
cd frontend
nvm use 20              # ensure Node 20 (required by Next.js 16)
cp .env.local.example .env.local   # or create with:
echo "NEXT_PUBLIC_API_URL=http://localhost:4000/api" > .env.local
npm install
npm run dev             # starts on http://localhost:3000
```

---

## API Endpoints

### Auth (`/api/auth`)

| Method | Path        | Description |
|--------|-------------|-------------|
| POST   | `/register` | Create account (name, email, password) |
| POST   | `/login`    | Sign in (email, password) → returns JWT + sets refresh cookie |
| POST   | `/logout`   | Clear refresh cookie |
| POST   | `/refresh`  | Exchange refresh token for new access token |
| POST   | `/google`   | Google OAuth sign in |
| GET    | `/me`       | Get current authenticated user |

### Notes (`/api/notes`)

| Method | Path              | Description |
|--------|-------------------|-------------|
| GET    | `/`               | List user's notes (query: `page`, `limit`, `filter`, `q`) |
| POST   | `/`               | Create a new note |
| GET    | `/:id`            | Get a single note |
| PUT    | `/:id`            | Update a note |
| DELETE | `/:id`            | Soft-delete a note |
| POST   | `/:id/restore`    | Restore a soft-deleted note |
| DELETE | `/:id/permanent`  | Permanently delete a note |
| POST   | `/:id/share`      | Generate or update a share token |
| DELETE | `/:id/share`      | Revoke share token |

### Sharing (`/api/share`)

| Method | Path          | Description |
|--------|---------------|-------------|
| GET    | `/t/:token`   | Fetch a shared note by public token |

### Media (`/api/media`)

| Method | Path       | Description |
|--------|------------|-------------|
| POST   | `/upload`  | Upload an image/file |
| POST   | `/unfurl`  | Unfurl a URL (fetch Open Graph metadata) |

### System

| Method | Path          | Description |
|--------|---------------|-------------|
| GET    | `/api/stats`  | Total user/note counts (used on landing page) |
| GET    | `/api/health` | Health check |

---

## Available Scripts

### Backend

| Command           | Description |
|-------------------|-------------|
| `npm run dev`     | Start dev server with hot reload (tsx watch) |
| `npm run build`   | Compile TypeScript |
| `npm start`       | Run compiled JS in production |

### Frontend

| Command           | Description |
|-------------------|-------------|
| `npm run dev`     | Next.js dev server with Turbopack |
| `npm run build`   | Production build |
| `npm start`       | Start production server |
| `npm run lint`    | Run ESLint |

---

## Editor Features

The editor uses **Tiptap v3** (ProseMirror) and supports the full TipTap schema. Content is stored as ProseMirror JSON documents.

### Formatting
- **Inline**: Bold, Italic, Underline, Strikethrough, Code, Links
- **Blocks**: H1–H3, Bullet lists, Ordered lists, Task lists, Blockquotes, Code blocks
- **Media**: Images, Horizontal rules
- **Advanced**: Tables (with headers), Text alignment

### Toolbar
- **Double-click** anywhere in the editor → floating toolbar appears above cursor
- **Text selection** → bubble menu appears near the selection
- Both are clamped to editor bounds

### Auto-save
- Every edit triggers a 2-second debounced save
- Visual indicator: "Unsaved" → "Saving…" → "Saved ✓"

---

## Responsive Design

- **Desktop (≥768px)**: Two-panel layout with resizable sidebar + editor
- **Mobile (<768px)**: Full-width drawer sidebar with backdrop overlay, open/close via hamburger button
- Opening a note on mobile automatically closes the sidebar drawer

---

## Theming

- Two themes: **light** and **dark**
- Default follows `prefers-color-scheme` system preference
- Toggle via the sun/moon icon in the TopNav
- Persisted in `localStorage`
- CSS custom properties defined in `globals.css` control the palette

### Font Stack
- **Body text**: Lora (serif) — editor content
- **UI labels**: DM Mono — sidebar, buttons, status text
- **Display headings**: Playfair Display — note titles, landing page

---

## Deployment

### Backend
The Express API can be deployed to any Node.js hosting (Railway, Render, Fly.io, etc.):

```bash
cd backend
npm run build
npm start
```

### Frontend
The Next.js app can be deployed to **Vercel** (recommended) or any Node.js host:

```bash
cd frontend
npm run build
npm start
```

Environment variables for production (frontend):
- `NEXT_PUBLIC_API_URL` — production API URL

---

## License

MIT
