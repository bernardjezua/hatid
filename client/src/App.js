import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from "./pages/LogInPage";
import SignUp from "./pages/SignUpPage";
import AdminPage from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LogIn />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/' element={<AdminPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
