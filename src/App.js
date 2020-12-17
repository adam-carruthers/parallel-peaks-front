import './shared/app.css';

import PreloadImages from "./redux_setup/preloadImagesComponent";

import Navbar from "./modules/navbar/navbarComponent";
import Footer from "./modules/footer/footerComponent";
import Routes from "./modules/routes/routesComponent";

function App() {
  return (
    <>
        <PreloadImages/>
        <Navbar/>
        <Routes/>
        <Footer/>
    </>
  );
}

export default App;
