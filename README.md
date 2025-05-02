# 🛠 Instrucciones para configurar el entorno de desarrollo

Este proyecto está desarrollado con **Next.js + Firebase**, así que para trabajar localmente, seguí estos pasos:

---

## ✅ Requisitos

### 1. Instalá las siguientes herramientas:

* [Node.js (versión LTS)](https://nodejs.org/)
* [Git](https://git-scm.com/)
* [Visual Studio Code (VS Code)](https://code.visualstudio.com/) (opcional pero recomendado)

Verificá la instalación:

```bash
node -v
npm -v
git --version
```

---

## 🚀 Clonar el repositorio y levantar el proyecto

### 1. Cloná el proyecto:

```bash
git clone https://github.com/leandrop22/moviliStore.git
cd moviliStore
```

### 2. Instalá las dependencias:

```bash
npm install
```

### 3. Variables de entorno

Crea un archivo llamado `.env.local` en la raiz del proyecto con los siguientes datos (pedíselos al admin del proyecto):

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

> ⚠ Importante: Este archivo **NO debe subirse a GitHub**. Asegurate de tener en tu `.gitignore` la línea:
> `.env.local`

### 4. Ejecutá el proyecto

```bash
npm run dev
```

Abrí en el navegador: `http://localhost:3000`

---

## 🧩 Recomendaciones para Visual Studio Code

Instalá estas extensiones:

* ESLint
* Prettier
* Tailwind CSS IntelliSense (si se usa Tailwind en el futuro)

---

## 📚 Buenas prácticas con Git

Aunque podés hacer simplemente:

```bash
git add .
git commit -m "mensaje"
git push
```

Es importante conocer y aplicar estas buenas prácticas:

### 1. **Comentar claramente**

Usá mensajes de commit que expliquen lo que hiciste:

```bash
git commit -m "Agrega formulario de publicación con validación"
```

### 2. **Evitá subir archivos sensibles**

Revisá que `.env.local`, carpetas temporales, etc. estén en `.gitignore`.

### 3. **Trabajá con ramas si es necesario**

Para trabajar en nuevas funcionalidades sin romper nada:

```bash
git checkout -b nombre-de-la-rama
```

Cuando termines:

```bash
git checkout main
git merge nombre-de-la-rama
git push origin main
```

### 4. **Sincronizá antes de hacer push**

Si alguien más subió algo:

```bash
git pull origin main --rebase
```

Luego:

```bash
git push origin main
```

---

## ✅ Todo listo

Una vez hecho esto, ya podés desarrollar y colaborar en el proyecto sin problemas 🚀

-------------------------------------------------------------------------------------------

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open url public with vercel [https://movilistore.vercel.app/]
Open url local [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
