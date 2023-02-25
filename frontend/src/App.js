import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Space from './pages/space/space';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Space />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
