import Common from './common.js';

class Advertisement extends Common {
  constructor(navigation, galleryHomeDiV) {
    super();

    this.name = 'adv';

    this.navigation = navigation;
    this.advDiv = document.getElementById('advertisement');

    this.header = document.querySelector('div#advertisement > header');
    this.form = document.querySelector('div#advertisement > form');
    this.plusButton = document.getElementById('open-form');
    this.minusButton = document.getElementById('close-form');

    this.header.addEventListener('click', () => {
      if (this.form.classList.contains('is-not-visible')) {
        this.plusButton.classList.add('is-not-visible');
        this.minusButton.classList.remove('is-not-visible');
        this.form.classList.remove('is-not-visible');
      } else {
        this.form.classList.add('is-not-visible');
        this.plusButton.classList.remove('is-not-visible');
        this.minusButton.classList.add('is-not-visible');
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
