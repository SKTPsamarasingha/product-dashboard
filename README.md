📦 Product Management Application
A simple and modern product management application that allows users to add, edit, delete, and manage products with validation, search, and a clean UI.

🚀 Features
Add, edit, and delete products
Form validation using React Hook Form + Zod
Image upload with validation (type & size)
Search and filter products
Toast notifications for user feedback
Dark mode support
Responsive UI

⚙️ Setup Instructions
1. Clone the repository
   git clone
   cd product-dashboard

2. Install dependencies
   npm install

3. Run the development server
   npm run dev

4. Open in browser
   http://localhost:3000

Tech Stack Used

   React (Next.js App Router)
   JavaScript (ES6+)
   React Hook Form
   Zod
   Tailwind CSS
   shadcn/ui components

UX Enhancements

   Sonner (toast notifications)
   Dark mode (Tailwind-based)
   LocalStorage (client-side persistence)

Assumptions

   Image uploads are handled on the client side and not persisted externally
   This project is designed as a frontend-focused application

Possible Improvements

   Integrate a backend (Node.js / Express / Prisma / PostgreSQL)
   Store images using cloud services (e.g., AWS S3 or Cloudinary)
   Add authentication, authorization and RBAC
   Implement pagination for large datasets
   Add advanced filtering (price range, categories)
   Add unit and integration tests
   Optimize performance with memoization and lazy loading

Summary

This project demonstrates:
Form handling and validation
Clean UI design with reusable components
State management and local persistence
User experience improvements (toast, dark mode, search)