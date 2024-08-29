import "./App.css";
import NavBar from "./components/NabBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PrivateComponent from "./components/PrivateComponent";
import AddPOC from "./components/AddPoc";
import AddClientForm from "./components/AddClientForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<h1>POC Listing Componant</h1>} />
            <Route path="/add" element={<AddPOC />} />
            <Route path="/update" element={<h1>update POC Componant</h1>} />
            <Route path="/logout" element={<h1>Logout Developer</h1>} />
            <Route path="/profile" element={<h1>Developer Componant</h1>} />
            <Route path="/add-client" element={<AddClientForm />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
