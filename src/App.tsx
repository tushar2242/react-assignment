import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/login/Login';
import Dashboard from './pages/dashboard';
import Projects from './pages/project';
import UserManager from './pages/users';
import RequireAuth from './components/auth/AuthRequire';


const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<div>403 Unauthorized</div>} />

      {/* Protected Routes */}
      <Route element={<RequireAuth />}>

        <Route path="/" element={<Projects />} />
        <Route path="/project/:id" element={<Dashboard />} />
        <Route path="/settings" element={<div>This is setting page</div>} />

      </Route>


      <Route element={<RequireAuth role="admin" />}>
        <Route path="/" element={<Projects />} />
        <Route path="/project/:id" element={<Dashboard />} />
        <Route path="/users" element={<UserManager />} />
        <Route path="/settings" element={<div>This is setting page</div>} />


      </Route>

      {/* <Route path="/setting" element={<div>This is setting page</div>} /> */}
    </Routes>
  );
};

export default App;
