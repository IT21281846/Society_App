import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
 import Login from './pages/Login';
 import Register from './pages/Register';
 import Dashboard from './pages/Dashboard';
 import Users from './pages/Users';
 import { AuthProvider } from './context/AuthContext';


// import Payments from './pages/Payments';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />

      </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;

/*      
        
        
        <Route path="/payments" element={<Payments />} />
*/