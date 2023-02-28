import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from './pages/dashboard/dashboard';
import Space from './pages/space/space';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Dashboard />} />
        <Route path='spaces'>
          <Route path=':spaceCode' element={<Space />}/>
        </Route>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
