# Guía para Agentes de IA (AGENTS.md)

Este documento proporciona contexto, arquitectura, convenciones y directrices para cualquier agente de IA que trabaje en el proyecto **Terapias Alternativas Marbella**.

## 1. Visión General del Proyecto

- **Proyecto**: Sitio web y panel de administración para "Terapias Alternativas Marbella" (Inés Uria).
- **Propósito**: Ofrecer información sobre terapias holísticas (Anatheóresis, Kinesiología, Coaching), mostrar testimonios, permitir contacto mediante formulario y WhatsApp, y proporcionar un panel de administración para gestionar testimonios.
- **Stack Tecnológico**:
  - **Framework**: Next.js 14.2 (App Router)
  - **Librería UI**: React 18
  - **Estilos**: Tailwind CSS, CSS Modules/Variables, Framer Motion, shadcn/ui (Radix UI)
  - **Base de Datos**: Supabase (PostgreSQL) / Archivos JSON locales
  - **Autenticación**: JWT personalizado con `jose` y `bcryptjs` (gestionado mediante cookies y Middleware de Next.js)
  - **Manejo de Formularios/Emails**: `react-hook-form`, `EmailJS`
  - **Carruseles/Sliders**: `swiper`, `react-slick`
  - **Iconos**: `lucide-react`

## 2. Estructura de Directorios

```text
/home/fernando/terapiasalternativasmarbella
├── app/                  # Next.js App Router (Páginas, layouts, API routes)
│   ├── admin/            # Rutas protegidas del panel de administración
│   ├── api/              # Endpoints API (auth, testimonios, etc.)
│   ├── blog/             # Páginas de blog
│   ├── servicios/        # Páginas de servicios detallados
│   ├── layout.tsx        # Layout principal (Header, Footer, Toaster)
│   └── page.tsx          # Landing page principal
├── components/           # Componentes React reutilizables
│   ├── ui/               # Componentes base de UI (generalmente de shadcn/ui)
│   └── ...               # Componentes específicos (Header, Footer, Sliders)
├── lib/                  # Utilidades y configuración de librerías
│   ├── auth.ts           # Lógica de autenticación JWT y contraseñas
│   ├── supabase.ts       # Cliente Supabase (Frontend)
│   ├── supabaseServer.ts # Cliente Supabase (Backend/Server)
│   └── utils.ts          # Utilidades (p. ej. `cn` para Tailwind)
├── data/                 # Datos estáticos (ej. testimonios.json)
├── public/               # Assets estáticos (Imágenes, fuentes, iconos)
├── scripts/              # Scripts de mantenimiento y migración (BD, creación de admin)
└── middleware.ts         # Middleware de Next.js para protección de rutas (/admin)
```

## 3. Arquitectura y Decisiones de Diseño

### 3.1. Enrutamiento (App Router)
Se utiliza el App Router de Next.js (`app/`). Todas las páginas bajo `app/admin/` están protegidas, excepto `app/admin/login`.

### 3.2. Autenticación y Autorización
- **Implementación**: Se utiliza un enfoque "custom" con JWT (librería `jose`) y `bcryptjs` para el hashing de contraseñas, en lugar de NextAuth o Supabase Auth.
- **Middleware**: El archivo `middleware.ts` intercepta las peticiones a `/admin/*`, verifica la cookie `auth-token` y el JWT. Si es inválido, redirige a `/admin/login`.
- **Usuarios**: Existe un usuario hardcodeado en `lib/auth.ts` (`ADMIN_USERS`). Para crear un admin o cambiar la contraseña, se utilizan los scripts en `scripts/maintenance/`.

### 3.3. Base de Datos (Supabase)
- **Migración en progreso**: El proyecto parece estar en transición o soportar datos híbridos (Supabase + archivos JSON locales en `data/testimonios.json`).
- **Scripts**: Existen scripts para ejecutar migraciones (`npm run db:migrate:testimonios`) y para aplicar políticas RLS (`npm run db:rls`).

### 3.4. Estilos y UI
- **Tailwind CSS**: Configurado en `tailwind.config.ts`. Se utilizan variables CSS para temas (Dark/Light mode, colores como `primary`, `background`, etc.).
- **Fuentes**: "Playfair Display" (títulos, clase `font-playfair`) y "Poppins" (texto general, clase `font-poppins`).
- **Componentes UI**: Se utiliza el patrón de diseño `shadcn/ui` localizado en `components/ui/` (por ejemplo, `button.tsx`, `input.tsx`). Para combinar clases se usa la utilidad `cn` exportada en `lib/utils.ts`.

### 3.5. Formularios y Notificaciones
- Se usa `EmailJS` en el frontend (`app/page.tsx`) para enviar mensajes de contacto directamente.
- Notificaciones de UI se manejan con `react-hot-toast` (El `Toaster` está montado en `app/layout.tsx`).

## 4. Guía de Trabajo para Agentes (Convenciones)

1. **Uso del App Router**:
   - Crear componentes cliente con `"use client"` sólo cuando sea necesario (hooks, interactividad).
   - Preferir Server Components para rendimiento y SEO.
2. **Modificación de Estilos**:
   - Utilizar las clases de Tailwind preexistentes.
   - Si se añade un componente UI estándar, instalarlo preferentemente vía shadcn/ui o seguir su patrón en `components/ui/`.
   - Utilizar la utilidad `cn()` (`import { cn } from "@/lib/utils"`) para concatenar clases condicionales.
3. **Autenticación**:
   - Al modificar rutas protegidas, asegurarse de que están cubiertas por el `matcher` del `middleware.ts`.
   - No almacenar contraseñas en texto plano. Usar las funciones de `lib/auth.ts`.
4. **Base de Datos**:
   - Si se añade una nueva tabla en Supabase, se debe crear el script de migración y la política RLS en la carpeta `scripts/db/`.
   - Utilizar el cliente adecuado: `lib/supabase.ts` para componentes cliente y `lib/supabaseServer.ts` para rutas API o Server Components.
5. **Assets**:
   - Las imágenes deben ir en `public/` y optimizarse (preferiblemente en formato `.webp`).
   - Usar el componente `<Image>` de Next.js.
6. **Scripts del Proyecto**:
   - Para correr en desarrollo: `npm run dev`
   - Migrar testimonios a la DB: `npm run db:migrate:testimonios`
   - Crear/Actualizar contraseñas de admin: `npm run admin:create` / `npm run admin:change-pwd`

## 5. Tareas Frecuentes

- **Añadir una página**: Crear una carpeta en `app/` con un archivo `page.tsx`.
- **Modificar el Nav**: Editar `components/Header.tsx` y `components/Footer.tsx`.
- **Actualizar Testimonios**: Si está usando Supabase, modificar a través del panel `/admin/testimonios`. Si no, editar `data/testimonios.json` o correr el script de migración.
- **Cambiar colores del tema**: Modificar las variables HSL en `app/globals.css`.

---
*Fin del AGENTS.md*
