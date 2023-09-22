import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Create } from './pages/create';
import { Auth } from './pages/auth';
import { Navbar } from './components/Navbar';
import { useCookies } from 'react-cookie';
const App = () => {
  const [cookies] = useCookies(["access_token"]);
  return (
    <div className="bg-background min-h-screen">
        <BrowserRouter>
        <Navbar/>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/create' element={cookies.access_token?<Create/>:<Home/>}/>
              <Route path='/auth' element={<Auth/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
