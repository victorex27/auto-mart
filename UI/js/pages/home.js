import Common from './common.js';
import Navigation from './navigation.js';
import GalleryHomeDiv from './gallerydiv.js';

class HomePage extends Common {
  constructor() {
    super();
    this.name = 'home';
    GalleryHomeDiv.initailize();
  }

  getName() {
    return this.name;
  }

  showPage() {
    Navigation.setPageType('home');
    
    GalleryHomeDiv.showPage();
  }

  removePage() {
    GalleryHomeDiv.removePage();
  }
}

export default HomePage;
