
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { AuthProvider } from './context';
import ProtectedComponent from './Components/ProtectComponent';
import Login from './pages/Login';
import Header from './Components/Header';
import EditItens from './pages/EditItens';
import { GlobalItensProvider } from './context/globalItens';

function App() {
  return (
    <AuthProvider>
      <GlobalItensProvider>
        <BrowserRouter>
          <Routes>
              <Route element={ <ProtectedComponent><Header /></ProtectedComponent>}>
                <Route path='/:id' element={ <Home/> } />
                <Route path='/editItens' element={<EditItens />}/>
              </Route>
            
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </GlobalItensProvider>
    </AuthProvider>
  );
}

export default App;
