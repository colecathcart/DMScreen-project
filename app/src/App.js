import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Login from "./pages/Login"
import Screen from "./pages/Screen"
import Privateroute from "./components/Privateroute"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/screen" element={<Privateroute><Screen/></Privateroute>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
