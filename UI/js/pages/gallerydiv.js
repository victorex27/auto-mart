const token = localStorage.getItem('token');
const galleryDiv = document.querySelector('main > div> div#gallery');
const filterDiv = document.querySelector('main > section');
const splashScreen = document.querySelector('#splash-screen');
const host = 'http://localhost:3000';
const retrieveCarsFromApi = (api) => {
  fetch(api,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(resp => resp.json()).then((result) => {
    const { status } = result;
    if (status === 200) {
      const { data } = result;
      galleryDiv.innerHTML = '';

      data.forEach((obj) => {
        // create elements to be added
        const mainDiv = document.createElement('div');
        const firstChildDiv = document.createElement('div');
        const secondChildDiv = document.createElement('div');
        const img = document.createElement('img');
        const nameSpan = document.createElement('span');
        const amountSpan = document.createElement('span');
        // attach result from the api
        img.src = obj.url;
        img.setAttribute('alt', 'car image');
        nameSpan.textContent = `${obj.manufacturer}-${obj.model}`;
        amountSpan.textContent = `${obj.price}`;
        // add class to the elements
        mainDiv.className = 'card';
        nameSpan.className = 'tertiary-color';
        amountSpan.className = 'primary-color amount';

        // append elements
        firstChildDiv.appendChild(img);
        secondChildDiv.appendChild(nameSpan);
        secondChildDiv.appendChild(amountSpan);
        mainDiv.appendChild(firstChildDiv);
        mainDiv.appendChild(secondChildDiv);
        galleryDiv.appendChild(mainDiv);
      });
      splashScreen.style.display = 'none';
      return;
    }
    const { error } = result;
    window.location.href = `./?msg=${error}`;
  }).catch((error) => {
    window.location.href = `./?msg=${error}`;
  });
};


const getAllUnsoldCars = () => { retrieveCarsFromApi(`${host}/api/v2/car?status=available`); };
const getAllUnsoldCarsByMileage = (value) => { retrieveCarsFromApi(`${host}/api/v2/car?status=available&state=${value}`); };
const getAllUnsoldCarsByPriceRange = (value) => {
  let min = 50;
  let max = value;

  if (value < 10) {
    min = value - 1;
  } else if (value === 10) {
    min = 5;
  }
  else if (value < 50) {
    min = value - 10;
  } else if (value === 'unlimited') {
    min = 50;
    max = 10000000000;
  }
  retrieveCarsFromApi(`${host}/api/v2/car?status=available&min_price=${min}&max_price=${max}`);
};

class GalleryHomeDiv {
  constructor(navigation, car) {
    // select option new or old
    const selectMileage = document.querySelector('select#mileage');
    const selectPriceRange = document.querySelector('select#price');


    this.notes = document.querySelectorAll('span.notification');
    this.isSoldDiv = document.querySelectorAll('span.is-sold-span');
    this.cards = document.querySelectorAll('.card');


    this.cards.forEach(

      (card) => {
        card.addEventListener('click', (ev) => {
          navigation.setCurrentPage(car);
          ev.preventDefault();
        });
      },

    );
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
    this.navigation = navigation;
  }

  showPage() {
    window.scroll(0, 0);

    galleryDiv.style.display = 'flex';


    if (!window.matchMedia('(max-width: 900px)').matches && this.navigation.getPageType() === 'home') {
      if (filterDiv) {
        galleryDiv.style.display = 'grid';
        filterDiv.style.display = 'flex';
      }
    }

    if (this.navigation.getPageType() === 'home') {
      getAllUnsoldCars();
    }
  }

  removePage() {
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
