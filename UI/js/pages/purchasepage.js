import Common from './common.js';
import Navigation from './navigation.js';

const div = document.querySelector('div#purchase-order');
class PurchaseOrderPage extends Common {
  constructor(navigation, car) {
    super();

    this.name = 'po';
    this.navigation = navigation;
    div.style.display = 'none';
    const buttons = document.querySelectorAll('.view-po');
    buttons.forEach(

      (button) => {
        button.addEventListener('click', (ev) => {
          Navigation.setCurrentPage(car);
          ev.preventDefault();
        });
      },

    );
  }


  showPage() {
    Navigation.setPageType('po');
    div.style.display = 'block';
  }

  removePage() {
    div.style.display = 'none';
  }

  getName() {
    return this.name;
  }
}

export default PurchaseOrderPage;
