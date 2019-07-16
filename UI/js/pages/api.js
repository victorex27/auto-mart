import Navigation from './navigation.js';

const token = localStorage.getItem('token');
const host = 'http://localhost:3000/api/v1/';
const splashScreen = document.querySelector('#splash-screen');

const retrieveDataFromApi = (api, obj) => {
  // obj  { type: 'galleryDiv', galleryDiv } for galleryDiv
  fetch(`${host}${api}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(resp => resp.json()).then((result) => {
    const { status } = result;
    if (status === 200) {
      const { data } = result;

      if (obj.type === 'single-car') {
        // create elements to be added
        const singleCarImage = document.querySelector('img#single-car-image');
        const singleCarOwner = document.querySelector('#single-car-owner');
        const singleCarName = document.querySelector('#single-car-name');
        const singleCarBody = document.querySelector('#single-car-body');
        const singleCarPrice = document.querySelector('#single-car-price');
        const singleCarManufacturer = document.querySelector('#single-car-manufacturer');
        const singleCarColor = document.querySelector('#single-car-color');
        const singleCarMileage = document.querySelector('#single-car-mileage');
        singleCarImage.src = data.url;
        singleCarOwner.textContent = data.owner;
        singleCarName.textContent = data.manufacturer + data.model;
        singleCarManufacturer.textContent = data.manufacturer;

        //   singleCarColor.textContent = data.color;
        singleCarMileage.textContent = data.state;
        singleCarPrice.textContent = data.price;
        singleCarBody.textContent = data.body_type;
      }

      splashScreen.style.display = 'none';
      return;
    }
    const { error } = result;
    window.location.href = `./?msg=${error}`;
  }).catch((error) => {
    window.location.href = `./?msg=${error}`;
  });
};

export const retrieveCarsFromApi = (api, obj) => {
// obj  { type: 'galleryDiv', galleryDiv } for galleryDiv
  fetch(`${host}${api}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(resp => resp.json()).then((result) => {
    const { status } = result;
    if (status === 200) {
      const { data } = result;

      if (obj.type === 'galleryDiv') {
        const { galleryDiv } = obj;
        galleryDiv.innerHTML = '';
        data.forEach((res) => {
        // create elements to be added
          const mainDiv = document.createElement('div');
          const firstChildDiv = document.createElement('div');
          const secondChildDiv = document.createElement('div');
          const img = document.createElement('img');
          const nameSpan = document.createElement('span');
          const amountSpan = document.createElement('span');
          // attach result from the api
          img.src = res.url;
          img.setAttribute('alt', 'car image');
          nameSpan.textContent = `${res.manufacturer}-${res.model}`;
          amountSpan.textContent = `${res.price}`;
          // add class to the elements
          mainDiv.className = 'card';
          const att = document.createAttribute('car-id');
          att.value = res.id;
          mainDiv.setAttributeNode(att);
          nameSpan.className = 'tertiary-color';
          amountSpan.className = 'primary-color amount';

          // append elements
          firstChildDiv.appendChild(img);
          secondChildDiv.appendChild(nameSpan);
          secondChildDiv.appendChild(amountSpan);
          mainDiv.appendChild(firstChildDiv);
          mainDiv.appendChild(secondChildDiv);
          galleryDiv.appendChild(mainDiv);

          mainDiv.addEventListener('click', (ev) => {
            ev.preventDefault();
            Navigation.setCurrentPage(new obj.Car(mainDiv.getAttribute('car-id')));
          });
        });
      }

      splashScreen.style.display = 'none';
      return;
    }
    const { error } = result;
    window.location.href = `./?msg=${error}`;
  }).catch((error) => {
    window.location.href = `./?msg=${error}`;
  });
};

export const retrieveCarFromApi = (api) => {
  retrieveDataFromApi(api, { type: 'single-car' });
};
