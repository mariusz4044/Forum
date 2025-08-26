# Internet Forum

Modern full-stack internet forum built with React/Next.js frontend and Express.js backend.

## 🚀 Features

### ✅ Implemented

#### General
- [x] ~~Login / Register~~
- [x] ~~User session~~
- [x] ~~Ban system~~
- [x] ~~User profiles~~
- [x] ~~Admin moderation system~~

#### Home page
- [x] ~~Topics and sections~~
- [x] ~~Show Last post in section~~
- [x] ~~Right panel (statistics)~~

#### Forum page
- [x] ~~Topic system~~
- [x] ~~Pagination system~~
- [x] ~~Post system~~
- [x] ~~Ratings system~~

### 🔄 In Progress
- [ ] Mobile version (50% complete)

### 📋 Planned Features
- [ ] User Settings
- [ ] Reporting post system
- [ ] Post search engine

## 🛠️ Tech Stack

### Backend
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **TypeScript** - Type-safe JavaScript
- **CORS** - Cross-Origin Resource Sharing
- **Express Session** - Session management

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
git clone <repository-url>
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
npx prisma migrate dev
npx prisma generate
```

4. **Setup Frontend**
```bash
cd frontend
# Configure environment variables in .env.local
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

### Frontend Scripts
- `npm run dev` - Start Next.js development server with Turbopack
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
├── backend/          # Express.js backend
│   ├── prisma/      # Database schema and migrations
│   └── src/         # Backend source code
├── frontend/        # Next.js frontend
│   ├── src/         # Frontend source code
│   └── public/      # Static assets
└── package.json     # Root package configuration
```

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

## 🔮 Roadmap

- [ ] Complete mobile responsiveness
- [ ] Advanced search functionality
- [ ] Real-time notifications
- [ ] File upload system
- [ ] Private messaging
- [ ] Dark mode theme
- [ ] API documentation
- [ ] Unit tests coverage