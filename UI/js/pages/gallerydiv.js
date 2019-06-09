class GalleryHomeDiv {
  constructor(navigation, car) {
    this.homeDiv = document.querySelector('main > div> div#gallery');
    this.filterDiv = document.querySelector('main > section');
    this.notes = document.querySelectorAll('span.notification');
    this.isSoldDiv = document.querySelectorAll('span.is-sold-span');
    this.cards = document.querySelectorAll('.card');

    // type takes the page that is creating the view
    // and displays the equivalent elements that are needed

    // console.log('my nav ',navigation);


    this.cards.forEach(

      (card) => {
        card.addEventListener('click', (ev) => {
          navigation.setCurrentPage(car);
          ev.preventDefault();
        });
      },

    );
    this.navigation = navigation;
  }

  showPage() {
    window.scroll(0, 0);
    this.homeDiv.style.display = 'flex';


    if (!window.matchMedia('(max-width: 700px)').matches && this.navigation.getPageType() === 'home') {
      this.filterDiv.style.display = 'flex';
    }
  }

  removePage() {
    this.homeDiv.style.display = 'none';
  }

  showNotificationDiv() {
    this.notes.forEach(
      (span) => {
        span.style.display = 'inline';
      },
    );
  }

  removeNotificationDiv() {
    this.notes.forEach(
      (span) => {
        span.style.display = 'none';
      },
    );
  }


  showSoldStatus() {
    this.isSoldDiv.forEach(
      (span) => {
        span.style.display = 'block';
      },
    );
  }

  removeSoldStatus() {
    this.isSoldDiv.forEach(
      (span) => {
        span.style.display = 'none';
      },
    );
  }

  getName() {
    return 'gallery';
  }
}

export default GalleryHomeDiv;
