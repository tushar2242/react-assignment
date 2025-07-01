import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/dashboard';

const CreateTask = () => <div>📝 Create Task Form</div>;
const Report = () => <div>📈 Report View</div>;

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateTask />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Layout>
  );
}

export default App;










