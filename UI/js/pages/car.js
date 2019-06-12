import Common from './common.js';

const overlay = document.querySelector('.overlay');

class Car extends Common {
  constructor(navigation) {
    super();
    this.name = 'car';
    this.navigation = navigation;
    this.makePurchaseOrderButton = document.getElementById('make-purchase-order-button');
    this.updatePurchaseOrderButton = document.getElementById('update-purchase-order-button');
    this.updateAdvertButton = document.getElementById('update-advert-button');
    this.currentPurchaseOrderDiv = document.getElementById('current-purchase-order-div');
    this.isSoldDiv = document.getElementById('is-sold-div');
    this.carDiv = document.getElementById('single-car');
    this.verifyPurchaseOrderDiv = document.getElementById('verify-purchase-order');

    // div for making puchase order, and updating price for both seller and user
    this.makePurchaseOrderDiv = document.getElementById('make-purchase-order');
    this.deletePostDiv = document.getElementById('delete-post-div');
    this.reportPostButton = document.getElementById('report-post');

    // purchase order status
    this.status = document.querySelector('div#current-purchase-order-div > div:nth-child(2)');

    // main div
    this.main = document.querySelector('main');


    /* modal */
    this.modalDiv = document.querySelector('.modal');
    this.modalCloseButton = document.querySelector('.close-modal');
    this.modalCloseButton.addEventListener('click', (ev) => {
      this.modalDiv.classList.remove('slide-down');
      overlay.classList.remove('slide-down');
      ev.preventDefault();
    });


    this.reportPostButton.addEventListener('click', (ev) => { this.onReportPostButton(ev); });
  }


  showPage() {
    window.scroll(0, 0);
    this.carDiv.style.display = 'flex';
    this.carDiv.classList.remove('is-not-visible');
    this.deletePostDiv.style.display = 'none';
    this.verifyPurchaseOrderDiv.style.display = 'none';
    this.status.style.display = 'none';

    switch (this.navigation.getPageType()) {
      case 'po':
        this.showPoPage();
        break;

      case 'adv':
        this.showAdvPage();
        break;
      case 'admin':
        this.showAdminPage();
        break;
      default:
        this.showHomePage();
    }
  }

  removePage() {
    this.carDiv.style.display = 'none';
    this.carDiv.classList.add('is-not-visible');
    this.makePurchaseOrderDiv.style.display = 'block';


    switch (this.navigation.getPageType) {
      case 'po':
        this.removePoPage();
        break;

      case 'adv':
        this.removeAdvPage();
        break;

      case 'admin':
        this.removeAdminPage();
        break;
      default:
        this.removeHomePage();
    }
  }


  showHomePage() {
    this.makePurchaseOrderButton.classList.remove('is-not-visible');
    this.updatePurchaseOrderButton.classList.add('is-not-visible');
    this.currentPurchaseOrderDiv.classList.add('is-not-visible');
    this.updateAdvertButton.classList.add('is-not-visible');
    this.isSoldDiv.style.display = 'none';
    this.reportPostButton.style.display = 'none';
  }

  removeHomePage() {
    this.makePurchaseOrderButton.classList.add('is-not-visible');
    this.updatePurchaseOrderButton.classList.remove('is-not-visible');
    this.currentPurchaseOrderDiv.classList.remove('is-not-visible');
  }

  showPoPage() {
    this.makePurchaseOrderButton.classList.add('is-not-visible');
    this.updatePurchaseOrderButton.classList.remove('is-not-visible');
    this.currentPurchaseOrderDiv.classList.remove('is-not-visible');
    this.updateAdvertButton.classList.add('is-not-visible');
    this.isSoldDiv.style.display = 'none';
    this.reportPostButton.style.display = 'block';
    this.status.style.display = 'block';
  }

  removePoPage() {
    this.makePurchaseOrderButton.classList.remove('is-not-visible');
    this.updatePurchaseOrderButton.classList.add('is-not-visible');
    this.currentPurchaseOrderDiv.classList.add('is-not-visible');
  }

  showAdvPage() {
    this.makePurchaseOrderButton.classList.add('is-not-visible');
    this.updatePurchaseOrderButton.classList.add('is-not-visible');
    this.currentPurchaseOrderDiv.classList.add('is-not-visible');
    this.updateAdvertButton.classList.remove('is-not-visible');
    this.isSoldDiv.style.display = 'flex';
    this.reportPostButton.style.display = 'none';
    this.verifyPurchaseOrderDiv.style.display = 'block';
  }

  removeAdvPage() {
    this.deletePostDiv.style.display = 'none';
  }

  showAdminPage() {
    this.makePurchaseOrderDiv.style.display = 'none';
    this.deletePostDiv.style.display = 'flex';
    this.reportPostButton.style.display = 'none';
  }

  removeAdminPage() {
    this.makePurchaseOrderDiv.style.display = 'none';
  }

  onReportPostButton(ev) {
    overlay.classList.add('slide-down');
    this.modalDiv.classList.add('slide-down');
    // this.modalDiv.style.display = 'flex';

    ev.preventDefault();
  }

  getName() {
    return this.name;
  }
}

export default Car;
