import Formulario from "@/pages/Formulario";
import HomePage from "@/pages/home";
import Inscricao from "@/pages/Inscricao";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inscricao" element={<Inscricao />} />
        <Route path="/formulario" element={<Formulario />} />
      </Routes>
    </Router>
  );
};

export default App;
