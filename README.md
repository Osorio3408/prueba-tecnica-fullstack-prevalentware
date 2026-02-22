# Financial Management System

Sistema de gestión de ingresos y gastos desarrollado como prueba técnica
Fullstack.

Permite administrar movimientos financieros, gestionar usuarios y
generar reportes con control de acceso basado en roles (RBAC).

------------------------------------------------------------------------

## Tecnologías Utilizadas

### Frontend

-   Next.js (Pages Router)
-   TypeScript
-   Tailwind CSS
-   Shadcn UI
-   Better Auth (GitHub OAuth)

### Backend

-   Next.js API Routes
-   Prisma ORM
-   PostgreSQL (Supabase)
-   Swagger / OpenAPI

### Testing

-   Jest (Unit Tests)

------------------------------------------------------------------------

## Roles y Permisos

  -----------------------------------------------------------------------
  USER                          Acceso a la gestión de movimientos

  ADMIN                         Acceso a reportes, edición de usuarios y
                                creación de movimientos
  -----------------------------------------------------------------------

> NOTA: Todos los nuevos usuarios se registran automáticamente con rol
> **ADMIN** para efectos de la prueba técnica.

------------------------------------------------------------------------

## Instalación y Ejecución Local

### 1️⃣ Clonar el repositorio

``` bash
git clone https://github.com/Osorio3408/prueba-tecnica-fullstack-prevalentware
cd proyecto
```

### 2️⃣ Instalar dependencias

``` bash
npm install
```

### 3️⃣ Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

``` env
DATABASE_URL="postgresql://..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
```

### 4️⃣ Generar cliente de Prisma

``` bash
npx prisma generate
```

Si es la primera vez que ejecutas el proyecto:

``` bash
npx prisma migrate dev
```

### 5️⃣ Ejecutar la aplicación

``` bash
npm run dev
```

Aplicación disponible en:

http://localhost:3000

------------------------------------------------------------------------

## Documentación de la API

Swagger UI disponible en:

http://localhost:3000/api/docs


------------------------------------------------------------------------

## Ejecutar Pruebas

``` bash
npm run test
```

Incluye pruebas unitarias para:

-   MovementService
-   UserService
-   ReportService

------------------------------------------------------------------------

## Estructura del Proyecto

    components/
      auth/
      dashboard/
      hooks/
      layouts/
      movements/
      ui/
      users/
    
    hooks/
      use-mobile.tsx

    lib/
      auth/
      rbac.ts
      utils.ts
      swagger.ts

    modules/
      movements/
      users/

    pages/
      api/
      _app.tsx
      _document.tsx
      docs.tsx
      index.tsx
      movements.tsx
      users.tsx
      reports.tsx

    prisma/
      migrations/
      schema.prisma

    public/

    styles/
      global.css

    tests/
      movement.serviuce.test.ts
      reports.service.test.ts
      user.service.test.ts

Arquitectura basada en separación por capas:

-   Controller → API Routes
-   Service → Lógica de negocio
-   Repository → Acceso a datos

------------------------------------------------------------------------

## Despliegue en Vercel

### 1️⃣ Subir el proyecto a GitHub

### 2️⃣ Crear nuevo proyecto en Vercel

-   Importar el repositorio
-   Configurar variables de entorno
-   Ejecutar Deploy

### Variables de entorno en Vercel

Configurar en Settings → Environment Variables:

DATABASE_URL\
GITHUB_CLIENT_ID\
GITHUB_CLIENT_SECRET\
NEXT_PUBLIC_BETTER_AUTH_URL

### Configuración importante

Asegúrate de tener en `package.json`:

``` json
"scripts": {
  "build": "next build",
  "postinstall": "prisma generate"
}
```

Esto garantiza que Prisma se genere correctamente en el entorno de
producción.

------------------------------------------------------------------------

## Seguridad

-   Control de acceso basado en roles (RBAC)
-   Endpoints protegidos
-   Validación de sesión en backend
-   Protección contra accesos no autorizados

------------------------------------------------------------------------

## Cumplimiento de Requisitos

* CRUD completo de movimientos
* Gestión de usuarios
* Reportes con gráfico financiero y saldo actual
* Descarga de reportes en formato CSV
* Documentación API con Swagger
* RBAC implementado
* Pruebas unitarias
* Deploy en Vercel

------------------------------------------------------------------------

## Notas

El aplicativo no incluye diseño responsivo según especificación de la
prueba técnica.

------------------------------------------------------------------------

## Autor

Desarrollado por Yuliam Osorio\
Prueba Técnica Fullstack
