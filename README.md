# CMS Practice - Sistema de Gestión de Contenidos

## 📋 Descripción
Sistema de gestión de contenidos (CMS) desarrollado con Next.js y Strapi, diseñado específicamente para organizaciones profesionales. El sistema permite gestionar contenido dinámico incluyendo noticias, documentos, información regional y departamental.

## 🚀 Características Principales
- Sistema de noticias y artículos
- Gestión de documentos
- Carruseles dinámicos de contenido
- Secciones regionales y departamentales
- Sistema de certificados
- Gestión de congresos y eventos
- Interfaz responsive y moderna

## 🛠️ Tecnologías Utilizadas
- **Frontend:**
  - Next.js 14
  - React
  - CSS Modules
  - Next Image Optimization
- **Backend:**
  - Strapi v4
  - SQLite (desarrollo)
  - JWT Authentication

## 📦 Estructura del Proyecto
```
├── frontend/               # Aplicación Next.js
│   ├── src/
│   │   ├── app/           # Páginas y rutas
│   │   ├── components/    # Componentes React
│   │   ├── lib/          # Funciones de API
│   │   └── styles/       # CSS Modules
│   └── public/           # Archivos estáticos
│
└── backend/              # Servidor Strapi
    ├── config/          # Configuraciones
    ├── src/            # API y extensiones
    └── public/         # Archivos subidos
```

## 🔧 Instalación y Configuración

### Requisitos Previos
- Node.js >= 18.17
- npm o yarn
- Git

### Configuración del Backend (Strapi)
1. Navegar al directorio del backend:
```bash
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

4. Iniciar el servidor de desarrollo:
```bash
npm run develop
```

### Configuración del Frontend (Next.js)
1. Navegar al directorio del frontend:
```bash
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env.local
```

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## ⚙️ Configuración de Variables de Entorno

### Backend (.env)
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=tu-app-key
API_TOKEN_SALT=tu-salt
ADMIN_JWT_SECRET=tu-jwt-secret
JWT_SECRET=tu-jwt-secret
```

### Frontend (.env.local)
```env
STRAPI_HOST=http://localhost:1337
STRAPI_TOKEN=tu-token-de-api
```

## 📚 Uso del Sistema

### Panel de Administración (Strapi)
1. Acceder a `http://localhost:1337/admin`
2. Iniciar sesión con credenciales de administrador
3. Gestionar contenido a través del panel

### Sitio Web (Frontend)
- Desarrollo: `http://localhost:3000`
- Principales secciones:
  - Inicio: `/`
  - Noticias: `/noticias`
  - Documentos: `/documentos`
  - Afiliados: `/afiliados`
  - Certificados: `/certificados`

## 🚀 Despliegue

### Backend
1. Configurar base de datos de producción
2. Ajustar variables de entorno
3. Construir la aplicación:
```bash
npm run build
```

### Frontend
1. Configurar variables de entorno de producción
2. Construir la aplicación:
```bash
npm run build
```

## 🔍 Testing
```bash
# Frontend
npm run test

# Backend
npm run test
```

## 📄 API Endpoints

### Principales Endpoints
- `GET /api/articles` - Obtener artículos
- `GET /api/documents` - Obtener documentos
- `GET /api/regionals` - Obtener información regional
- `GET /api/departamentals` - Obtener información departamental

## 👥 Contribución
1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles

## 🤝 Soporte
Para soporte y consultas:
- Crear un issue en el repositorio
- Contactar al equipo de desarrollo

## ✨ Créditos
Desarrollado por [bjta07](https://github.com/bjta07)

---

⌨️ con ❤️ por [bjta07](https://github.com/bjta07)
