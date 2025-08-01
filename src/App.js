import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Bookings from "./pages/Bookings";
import Buses from "./pages/Buses";
import HomePage from "./pages/HomePage";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import PrivateBus from "./components/PrivateBus";
import PublicBus from "./components/PublicBus";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/buses" element={<Buses />}>
          <Route path="private" element={<PrivateBus />}></Route>
          <Route path="public" element={<PublicBus />}></Route>
        </Route>
        <Route path="/bookings" element={<Bookings />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};

export default App;
