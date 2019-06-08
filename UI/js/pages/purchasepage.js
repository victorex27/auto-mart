import Common from './common.js';

class PurchaseOrderPage extends Common {
  constructor(navigation, galleryHomeDiV) {
    super();

    this.name = 'po';

    this.navigation = navigation;
    this.galleryHomeDiV = galleryHomeDiV;
  }


  showPage() {
    this.navigation.setPageType('po');
    this.galleryHomeDiV.showPage();
  }

  removePage() {
    this.galleryHomeDiV.removePage();
  }

  getName() {
    return this.name;
  }
}

export default PurchaseOrderPage;
