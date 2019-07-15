import Navigation from './navigation.js';
import Car from './car.js';
import { retrieveCarsFromApi } from './api.js';

const galleryDiv = document.querySelector('main > div> div#gallery');
const filterDiv = document.querySelector('main > section');

const getAllUnsoldCars = () => {
  retrieveCarsFromApi('car?status=available', { type: 'galleryDiv', galleryDiv, Car });
};
const getAllUnsoldCarsByMileage = (value) => {
  retrieveCarsFromApi(`car?status=available&state=${value}`, { type: 'galleryDiv', galleryDiv, Car });
};
const getAllUnsoldCarsByPriceRange = (value) => {
  let min = 50;
  let max = value;
  if (value < 10) {
    min = value - 1;
  } else if (value === 10) {
    min = 5;
  } else if (value < 50) {
    min = value - 10;
  } else if (value === 'unlimited') {
    min = 0;
    max = 10000000000;
  }
  retrieveCarsFromApi(`car?status=available&min_price=${min}&max_price=${max}`, { type: 'galleryDiv', galleryDiv, Car });
};

class GalleryHomeDiv {
  constructor() {
    // select option new or old


    this.notes = document.querySelectorAll('span.notification');
    this.isSoldDiv = document.querySelectorAll('span.is-sold-span');
  }

  static initailize() {
    const selectMileage = document.querySelector('select#mileage');
    const selectPriceRange = document.querySelector('select#price');
    selectMileage.addEventListener('change', (ev) => {
      ev.preventDefault();
      const { value } = selectMileage[selectMileage.selectedIndex];
      if (value === 'new') {
        getAllUnsoldCarsByMileage('new');
        return;
      }

      if (value === 'used') {
        getAllUnsoldCarsByMileage('used');
        return;
      }

      getAllUnsoldCars();
    });

    selectPriceRange.addEventListener('change', (ev) => {
      ev.preventDefault();
      const { value } = selectPriceRange[selectPriceRange.selectedIndex];
      getAllUnsoldCarsByPriceRange(value);
    });
  }

  static showPage() {
    window.scroll(0, 0);

    galleryDiv.style.display = 'flex';


    if (!window.matchMedia('(max-width: 900px)').matches && Navigation.getPageType() === 'home') {
      if (filterDiv) {
        galleryDiv.style.display = 'grid';
        filterDiv.style.display = 'flex';
      }
    }

    if (Navigation.getPageType() === 'home') {
      getAllUnsoldCars();
    }
  }

  static removePage() {
    galleryDiv.style.display = 'none';
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
