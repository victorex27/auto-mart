import Common from './common.js';

class AdminPage extends Common {
  constructor(navigation, galleryHomeDiV) {
    super();
    this.navigation = navigation;
    this.galleryHomeDiV = galleryHomeDiV;
  }

  showPage() {
    this.navigation.setPageType('admin');
    this.galleryHomeDiV.showPage();
  }

  removePage() {
    this.galleryHomeDiV.removePage();
  }
  getName(){
    return 'admin';
  }
}

export default AdminPage;
