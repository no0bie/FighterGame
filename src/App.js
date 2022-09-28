import Wallet from "./Wallet";
import Menu from  "./Menu";
import ChooseEnemy from "./ChooseEnemy"
import FighterSelect from "./FighterSelected";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {

  return (
    <Router>
    <Routes>
          <Route path='/menu' element={<Menu/>} />
          <Route path='/fighter' element={<FighterSelect />} />
          <Route path='/enemies' element={<ChooseEnemy/>} />
          <Route path='/' element={<Wallet/>} />
        </Routes>
    </Router>
  );
}

export default App;