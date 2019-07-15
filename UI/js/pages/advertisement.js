import Common from './common.js';
import Navigation from './navigation.js';

const div = document.querySelector('div#advert');
class Advertisement extends Common {
  constructor(navigation, car) {
    super();

    this.name = 'adv';

    this.navigation = navigation;
    this.advDiv = document.getElementById('advertisement');

    this.formButton = document.querySelector('div#advertisement > header>button');
    this.formButtonImage = document.querySelector('div#advertisement > header>button > img');
    this.form = document.querySelector('div#advertisement > form');

    this.formButton.addEventListener('click', () => {
      this.form.classList.toggle('is-not-visible');
      if (this.form.classList.contains('is-not-visible')) {
        this.formButtonImage.src = '/UI/img/Plus_Math.ico';
      } else {
        this.formButtonImage.src = '/UI/img/Minus.ico';
      }
    });

    div.style.display = 'none';
    const buttons = document.querySelectorAll('.view-ad');
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
    Navigation.setPageType('adv');
    this.advDiv.style.display = 'flex';
    this.advDiv.classList.remove('is-not-visible');
    div.style.display = 'block';
  }

  getName() {
    return this.name;
  }

  removePage() {
    this.advDiv.style.display = 'none';
    this.advDiv.classList.add('is-not-visible');
    div.style.display = 'none';
  }
}

export default Advertisement;
