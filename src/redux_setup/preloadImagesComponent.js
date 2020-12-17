import {Helmet} from "react-helmet";
import justWaves from '../shared/img/just-waves.png';
import bg404 from'../modules/page404/bg404.png';

const PreloadImages = () => (
    <Helmet>
        <link rel="preload" as="image" href={justWaves}/>
        <link rel="preload" as="image" href={bg404}/>
    </Helmet>
)

export default PreloadImages;