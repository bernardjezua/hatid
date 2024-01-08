import './App.css';
import NavigationBar from './components/NavigationBar';
import AdminNavigationBar from './components/AdminNavigationBar';
import Footer from './components/Footer';
import ProductsCrops from "./pages/ProductCropsPage";
import ProductsPoultry from "./pages/ProductPoultryPage";
import ProductDisplay from "./pages/ProductDisplay";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import ProfilePage from "./pages/ProfilePage";
import LogIn from "./pages/LogInPage";
import SignUp from "./pages/SignUpPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/MainPage";
import AdminPage from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/login' element={<LogIn />}/>
      <Route path='/signup' element={<SignUp />}/>
      </Routes>
      {/* <NavigationBar /> */}
      <AdminNavigationBar />
      <Routes>
        {/* <Route path='/' element={<Home />}/> */}
        {/* <Route path='/Products/:name' element={<ProductDisplay />}/>
        <Route path='/Products/Crops' element={<ProductsCrops />}/>
        <Route path='/Products/Poultry' element={<ProductsPoultry />}/>

        <Route path='/ShoppingCart' element={<ShoppingCartPage />}/> */}
        <Route path='/' element={<AdminPage />}/>
      <Route path='/Profile' element={<ProfilePage />}/>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
