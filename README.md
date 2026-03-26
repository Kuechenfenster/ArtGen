# HTI Artwork Generator (ArtGen)

A comprehensive artwork management and compliance tracking system for HTI Toys.

## 🚀 Features

- **Project Management** - Track artwork projects from creation to approval
- **Compliance Database** - Multilingual warning templates and safety symbols
- **Translation Management** - Track outsourced translation orders
- **Designer Assignment** - Assign and manage design team members
- **File Management** - Upload and organize artwork files

## 🛠️ Tech Stack

### Frontend
- React 19 (Functional Components, Hooks)
- TypeScript
- Vite (Build Tool)
- Tailwind CSS (Styling)
- Material Symbols (Icons)

### Backend
- Node.js + Express
- TypeScript
- PostgreSQL 16

### DevOps
- Docker + Docker Compose
- Nginx (Production Web Server)

## 📦 Installation

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local development)

### Docker Deployment (Recommended)

```bash
# Clone the repository
git clone https://github.com/gismo13/ArtGen.git
cd ArtGen

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# API: http://localhost:8080
# PostgreSQL: localhost:5432
```

### Local Development

```bash
# Install frontend dependencies
npm install

# Start development server
npm run dev

# Frontend runs on http://localhost:5173
```

## 🗄️ Database Schema

The PostgreSQL database includes:
- `projects` - Artwork project tracking
- `designers` - Design team members
- `project_designers` - Project assignments
- `artwork_files` - Uploaded files
- `warning_templates` - Compliance warnings
- `warning_translations` - Multilingual translations
- `translation_orders` - Translation requests
- `translation_items` - Order line items

## 🔧 Configuration

### Environment Variables

Create `.env` file in the root directory:

```env
# API Configuration
PORT=8080
DATABASE_URL=postgresql://artgen:artgen_secret_password@db:5432/artgen_db
NODE_ENV=production
```

### Default Database Credentials

- **Database:** artgen_db
- **Username:** artgen
- **Password:** artgen_secret_password
- **Port:** 5432

## 📁 Project Structure

```
artgen/
├── src/                    # React frontend source
│   ├── pages/              # Page components
│   ├── App.tsx             # Main app component
│   ├── types.ts            # TypeScript interfaces
│   └── index.css           # Global styles
├── api/                    # Backend API
│   ├── src/index.ts        # Express server
│   ├── package.json
│   └── Dockerfile
├── database/               # Database scripts
│   └── init.sql            # Schema initialization
├── docker-compose.yml      # Docker services
├── Dockerfile              # Frontend build
├── nginx.conf              # Nginx configuration
└── package.json            # Frontend dependencies
```

## 🎨 UI Design System

- **Primary Accent:** #13a4ec (Bright Blue)
- **Background Dark:** #101c22
- **Panel Dark:** #1a2a32
- **Border Dark:** #2d4552
- **Font:** Inter Sans-Serif
- **Icons:** Material Symbols Outlined

## 📱 Pages

1. **Dashboard** - Overview of all projects with status indicators
2. **Project Detail** - Deep dive into specific projects
3. **Create Project** - Form for new project creation
4. **Warning Database** - Searchable compliance database
5. **Translations** - Translation order management

## 🔐 Security

- CORS enabled for API
- SQL injection prevention via parameterized queries
- Docker network isolation
- Production-ready Nginx configuration

## 📝 License

Proprietary - HTI Toys

## 👥 Contact

For questions or support, contact the HTI Artwork team.
