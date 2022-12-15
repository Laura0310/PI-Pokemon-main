import './App.css';
import { Route } from "react-router-dom"; // nos permite tener todas las rutas
import Home from './pages/Home/Home';
import Details from './pages/Details/Details';
import Create from "./pages/Create/Create";
import Landingpage from './pages/Landingpage/Landingpage';
import NavBar from './components/NavBar/NavBar';
// import axios from "axios";
// axios.defaults.baseURL= "http://localhost:3001" // otra forma de ahorrarse espacio en las actions 
// archivo que se encarga de usar todas las rutas, los states y renderizar las pages

// deberi poner /types aqui??? como lo pongo?
function App() {
  return (
    <div>
      <Route path="/" component={NavBar} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/details/:id" component={Details} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/" component={Landingpage} />
    </div>
  );
}

export default App;
