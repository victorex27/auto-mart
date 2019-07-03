import Common from './common.js';


class HomePage extends Common {
  constructor(navigation, galleryHomeDiv) {
    super();
    this.name = 'home';
    // Get gallery plus filter div
    this.galleryHomeDiV = galleryHomeDiv;
    this.navigation = navigation;
  }

  getName() {
    return this.name;
  }

  showPage() {
    

    this.navigation.setPageType('home');

    this.galleryHomeDiV.showPage();
  }

  removePage() {

    this.galleryHomeDiV.removePage();
  }
}

export default HomePage;
