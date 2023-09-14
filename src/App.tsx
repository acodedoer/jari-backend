import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Create } from './pages/create';
import { Auth } from './pages/auth';
import { View } from './pages/view';
import { Navbar } from './components/Navbar';
const App = () => {
  return (
    <div className="bg-background min-h-screen">
        <BrowserRouter>
        <Navbar/>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/create' element={<Create/>}/>
              <Route path='/auth' element={<Auth/>}/>
              <Route path='/view' element={<View/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
