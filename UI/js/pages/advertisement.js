import Common from './common.js';

class Advertisement extends Common {
  constructor(navigation, galleryHomeDiV) {
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

    this.galleryHomeDiV = galleryHomeDiV;
  }

  showPage() {
    this.navigation.setPageType('adv');
    this.advDiv.style.display = 'flex';
    this.advDiv.classList.remove('is-not-visible');
    this.galleryHomeDiV.showPage();
  }

  getName() {
    return this.name;
  }

  removePage() {
    this.advDiv.style.display = 'none';
    this.advDiv.classList.add('is-not-visible');
    this.galleryHomeDiV.removePage();
  }
}

export default Advertisement;
