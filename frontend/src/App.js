import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from './context/AuthContext';

// import PrivateRoute from './utils/PrivateRoute';

import HomePage from './pages/homepage/HomePage';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Dashboard from './pages/dashboard/dashboard';
import Space from './pages/space/space';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            {/* <PrivateRoute path="/" exact></PrivateRoute> */}
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='spaces'>
              <Route path=':spaceCode' element={<Space />}/>
              <Route path=':spaceCode/:fileName' element={<Space />}/>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
