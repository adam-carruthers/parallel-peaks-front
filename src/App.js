import './shared/app.css';

import Navbar from "./modules/navbar/navbarComponent";
import Footer from "./modules/footer/footerComponent";
import Routes from "./modules/routes/routesComponent";

function App() {
  return (
    <>
        <Navbar/>
        <Routes/>
        <Footer/>
    </>
  );
}

export default App;
