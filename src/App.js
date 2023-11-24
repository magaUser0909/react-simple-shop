import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import About from "./pages/About";

import { Navbar } from './components/Navbar';
import { Alert } from "./components/Alert";

import { AlertState } from "./context/alert/AlertState";
import { DatabaseState } from "./context/database/DatabaseState";

function App() {
  return (
    <AlertState>
      <DatabaseState>
        <BrowserRouter>
          <Navbar />
          <div className="container pt-4">
            <Alert />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DatabaseState>
    </AlertState>
  );
}

export default App;
