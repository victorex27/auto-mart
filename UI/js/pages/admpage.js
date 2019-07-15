import Common from './common.js';
import Navigation from './navigation.js';

const div = document.querySelector('div#admin-page');
class AdminPage extends Common {
  constructor(navigation, car) {
    super();
    this.navigation = navigation;
    div.style.display = 'none';
    const buttons = document.querySelectorAll('.view-adm');
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
    Navigation.setPageType('admin');
    div.style.display = 'block';
  }

  removePage() {
    div.style.display = 'none';
  }

  getName() {
    return 'admin';
  }
}

export default AdminPage;
