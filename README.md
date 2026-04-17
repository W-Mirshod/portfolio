# Portfolio Website 🚀

A **modern, blazing-fast** portfolio website built with React + Vite, featuring **multilingual support**, **parallax effects**, and **performance optimization**. Fully containerized with Docker Compose for seamless deployment.

## 🏗️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Internationalization**: i18next (EN/RU/UZ)
- **Performance**: Lazy loading, image optimization, HTTP/2 push
- **Deployment**: Docker Compose + Nginx
- **Audio**: Ambient sound integration

## 🚀 Quick Start

### Development
```bash
cd frontend
npm install
npm run dev
```

### Production Deployment
```bash
# Create external network (one-time setup)
docker network create web

# Build and deploy
docker compose up -d --build

# Check status
docker compose ps
```

**That's it!** Your portfolio is now running on port 8080 with **enterprise-grade** Nginx configuration including:
- ✅ Gzip compression
- ✅ HTTP/2 Server Push
- ✅ Security headers
- ✅ Aggressive caching
- ✅ Health monitoring

## 📁 Repository Roadmap

### 🎯 Core Structure
```
portfolio/
├── 📁 frontend/                 # React + Vite application
│   ├── 📁 src/
│   │   ├── 📁 components/       # Reusable UI components
│   │   │   ├── 📁 sections/     # Page sections (Home, Skills, etc.)
│   │   │   ├── 📁 ui/           # UI components (LazyImage, Parallax)
│   │   │   └── 📁 styles/       # Component-specific styles
│   │   ├── 📁 data/             # JSON data files
│   │   ├── 📁 locales/          # i18n translations (EN/RU/UZ)
│   │   └── 📁 utils/            # Utility functions
│   ├── 📁 public/               # Static assets
│   └── 📄 Dockerfile            # Multi-stage build (Node → Nginx)
├── 📄 docker-compose.yml        # Container orchestration
└── 📄 README.md                 # This file
```

### 🎨 Frontend Architecture

#### **Components Structure**
- **`sections/`** - Main page sections
  - `Home.jsx` - Hero section with parallax
  - `Skills.jsx` - Technical skills showcase
  - `Experience.jsx` - Work experience timeline
  - `Projects.jsx` - Portfolio projects grid
  - `Achievements.jsx` - Certifications & awards
  - `Certificate.jsx` - Certificate display
  - `Header.jsx` - Navigation header
  - `Footer.jsx` - Site footer

- **`ui/`** - Reusable UI components
  - `LazyImage.jsx` - Optimized image loading
  - `ParallaxBackground.jsx` - Parallax effect component
  - `GoToTop.jsx` - Scroll to top button

#### **Data Management**
- **`data/`** - Structured JSON files
  - `experience.json` - Work experience data
  - `projects.json` - Project portfolio
  - `skills.json` - Technical skills
  - `organizations.json` - Company information
  - `techStack.json` - Technology stack icons

#### **Internationalization**
- **`locales/`** - Multi-language support
  - `en/translation.json` - English translations
  - `ru/translation.json` - Russian translations
  - `uz/translation.json` - Uzbek translations

#### **Utilities**
- **`utils/`** - Helper functions
  - `i18n.js` - Internationalization setup
  - `parallax.js` - Parallax effect utilities
  - `audio.js` - Audio management

### 🐳 Docker Configuration

#### **Multi-Stage Build Process**
1. **Build Stage**: Node.js Alpine → Install dependencies → Build React app
2. **Production Stage**: Nginx Alpine → Serve static files → Apply optimizations

#### **Nginx Optimizations**
- **Compression**: Gzip for all text assets
- **Caching**: 1 year for static assets, 1 hour for HTML
- **Security**: XSS protection, content type sniffing prevention
- **Performance**: HTTP/2 push, DNS prefetch, resource timing
- **Monitoring**: Health check endpoint (`/health`)

### 📊 Performance Features

- **Lazy Loading**: Images and sections load on demand
- **Image Optimization**: WebP format with fallbacks
- **Code Splitting**: Dynamic imports for better loading
- **Caching Strategy**: Aggressive caching with versioning
- **Audio Integration**: Ambient background sounds
- **Parallax Effects**: Smooth scrolling animations

### 🌍 Deployment Strategy

- **Containerization**: Docker Compose for easy scaling
- **Reverse Proxy**: External Nginx network for flexibility
- **SSL Ready**: HTTPS configuration prepared
- **Health Monitoring**: Built-in health checks
- **Zero Downtime**: Rolling updates with Docker Compose

---

**Ready to deploy?** Just run `docker compose up -d --build` and you're **LIVE**! 🎉