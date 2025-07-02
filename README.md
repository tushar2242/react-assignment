
# 🛠️ Task Manager App

A task management dashboard built with **Vite**, **React**, **Redux Toolkit**, **Material UI**, and **TypeScript**. Features include role-based authentication, project/task tracking, user management, and dynamic routing.

---

## 📦 Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router v6](https://reactrouter.com/)
- [Material UI](https://mui.com/)
- [Formik + Yup](https://formik.org/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

> Vite will start your project at [http://localhost:5173](http://localhost:5173) by default.

---

## 👤 Login Credentials

Use the following test credentials:

### 🔐 Admin

- **Email:** `admin@example.com`
- **Password:** `admin123`

### 👷 User

- **Email:** `user@example.com`
- **Password:** `user123`

---

## 🧩 Project Structure

```bash
src/
├── components/         # Reusable UI components
│   ├── auth/           # Auth guards (RequireAuth)
│   ├── login/          # Login form
│   ├── projects/       # Project modal and related components
│   └── task/           # Task board and chart
├── pages/              # Route pages (dashboard, users, etc.)
├── redux/              # Redux slices (projectSlice, taskSlice, userSlice)
├── layout/             # Application layout
└── main.tsx            # Vite entry point
```

---

## 🛡️ Role-Based Routing

- **Admin:** Can access all routes (`/`, `/project/:id`, `/users`)
- **User:** Limited to assigned projects and project dashboard

Routes are protected using `<RequireAuth role="admin" />` or `<RequireAuth />`.

---

## 🛠️ Build for Production

```bash
npm run build
```

The compiled files will be in the `dist/` directory.

---

## 📄 License

MIT License © 2025

---

## 🙌 Contributing

Pull requests and suggestions are welcome!
