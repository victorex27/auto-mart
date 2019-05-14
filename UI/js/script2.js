import HomePage from './pages/home.js';
import Navigation from './pages/navigation.js';

const startApp = () => {
    
    let homePage = new HomePage(new Navigation());
    
};


startApp();