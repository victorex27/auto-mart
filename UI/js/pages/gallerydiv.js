class GalleryHomeDiv {
  constructor(navigation, car) {
    this.homeDiv = document.querySelector('main > div#gallery');
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
      // console.log('here we are');
    }


    switch (this.navigation.getPageType()) {
      case 'home': {
        if (window.matchMedia('(max-width: 700px)').matches) {
          this.homeDiv.style.width = '100%';
        } else {
          // this.homeDiv.style.width = '75%';
        }
        this.removeNotificationDiv();
        this.removeSoldStatus();
      }
        break;

      case 'po': {
        this.homeDiv.style.width = '100%';
        this.removeSoldStatus();
        this.removeFilterDiv();
        this.showNotificationDiv();
      }

        break;

      case 'adv': {
        this.homeDiv.style.width = '100%';
        this.removeSoldStatus();
        this.removeFilterDiv();
        this.showNotificationDiv();
      }

        break;

      case 'admin': {
        this.homeDiv.style.width = '100%';
        this.showSoldStatus();
        this.removeFilterDiv();
        this.removeNotificationDiv();
      }

        break;
    }
  }

  removePage() {
    this.homeDiv.style.display = 'none';
    // if (HomePage.Type === 'home') {
    //   this.removeFilterDiv();
    // }
  }


  removeFilterDiv() {
    this.filterDiv.style.display = 'none';
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
