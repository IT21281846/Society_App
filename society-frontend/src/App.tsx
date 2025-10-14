import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
 import Login from './pages/Login';
 import Register from './pages/Register';
 import Dashboard from './pages/Dashboard';
 import Users from './pages/Users';


// import Payments from './pages/Payments';

function App() {
  return (
    
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />

      </Routes>
    </Router>

  );
}

export default App;

/*      
        
        
        <Route path="/payments" element={<Payments />} />
*/