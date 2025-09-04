# Internet Forum

Modern full-stack internet forum designed with a strong focus on performance.

©️ Demo: [forum.avadi.ovh](https://forum.avadi.ovh)

## 🔮 Roadmap

**Done:**
- [x] Registration/Login
- [x] Forum homepage (topics/sections/statistics)
- [x] Creating topics
- [x] Adding posts to topics
- [x] User profiles
- [x] Global statistics
- [x] Pagination system for topics and posts
- [x] Post rating system
- [x] Reporting system
- [x] Admin menu
  - [x] Deleting posts
  - [x] Deleting all posts from a user
  - [x] Banning users
  - [x] Closing topics
  - [x] Deleting topics
  - [x] Editing user posts
- [x] Topic caching system

**In Progress:**
- [ ] User settings
- [ ] Post search engine
- [ ] Text editor (e.g. [Quill](https://quilljs.com/))
- [ ] Preview reported posts (admin)


## 🛠️ Tech Stack

### Backend
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **TypeScript** - Type-safe JavaScript
- **CORS** - Cross-Origin Resource Sharing
- **Express Session** - Session management
- **Zod** - Runtime schema validation

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **SWR** - Data fetching library
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Database (PostgreSQL, MySQL, or SQLite)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/mariusz4044/Forum
cd forum-project
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Backend**
```bash
cd backend
# Configure your database connection in .env
# Run Prisma migrations
npm run db-build
```

4. **Setup Frontend**
```bash
cd frontend
# Configure environment variables in .env.local
npm run dev
```

5. **Start the development servers**
```bash
# From root directory
npm start
```

This will start both backend and frontend servers concurrently.

## 🚦 Available Scripts

- `npm start` - Start both backend and frontend servers
- `npm run start:backend` - Start only backend server
- `npm run start:frontend` - Start only frontend server

### Backend Scripts
- `npm run ts` - Start TypeScript development server
- `npm run db-build` - Run prisma migration & push
- `npm run db-client` - Start prisma client
  
### Frontend Scripts
- `npm run dev` - Start Next.js development server with Turbopack
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/forum"
SESSION_SECRET="super secret cookies"
NODE_ENV="development"

# Forum settings
POST_DELAY_PER_USER=3
TOPIC_DELAY_PER_USER=60
REPORT_DELAY_PER_USER=60

# Forum page settings
TOPIC_PER_PAGE=10
POSTS_PER_PAGE=10
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.




