import HomePage from './pages/home.js';
import Navigation from './pages/navigation.js';
import Advertisement from './pages/advertisement.js';
import PurchaseOrderPage from './pages/purchasepage.js';
import AdminPage from './pages/admpage.js';
import GalleryDiv from './pages/gallerydiv.js';
import Car from './pages/car.js';


// menu and close button
const menuButton = document.getElementById('menu-button');
const closeButton = document.getElementById('close-button');
const filterListButton = document.getElementById('filter-list');
const closeFilterButton = document.getElementById('close-filter');

// aside div
const aside = document.querySelector('aside');
const section = document.querySelector('section');

// tabs in the aside block
const homeTab = document.getElementById('home_tab');
const advTab = document.getElementById('adv_tab');
const poTab = document.getElementById('po_tab');
const adminTab = document.getElementById('admin_tab');
const backButton = document.querySelector('#back-button-fullscreen ');
const backButtonSmall = document.querySelector('#back-button-mobile');

if (window.matchMedia('(max-width: 900px)').matches) {
  aside.classList.remove('aside-fullscreen');
}


// let activeTab = homeTab;
const navigation = new Navigation();
// event listeners
const onmenuButtonClicked = () => {
  aside.classList.add('slide-right');
};

const onBackButtonClicked = () => {
  Navigation.setLastPage();
};

const oncloseButtonClicked = () => {
  if (window.matchMedia('(max-width: 900px)').matches) {
    aside.classList.remove('slide-right');
  }
};

const onFilterListButtonClicked = () => {
  section.classList.add('slide-right');
};

const onCloseFilterButtonClicked = () => {
  section.classList.remove('slide-right');
};

menuButton.addEventListener('click', onmenuButtonClicked);
closeButton.addEventListener('click', oncloseButtonClicked);
backButton.addEventListener('click', onBackButtonClicked);
backButtonSmall.addEventListener('click', onBackButtonClicked);

filterListButton.addEventListener('click', onFilterListButtonClicked);
closeFilterButton.addEventListener('click', onCloseFilterButtonClicked);
const startApp = () => {
  const car = new Car(navigation);

  const homePage = new HomePage();
  const purchaseOrderPage = new PurchaseOrderPage(navigation, car);
  const advertisement = new Advertisement(navigation, car);
  const adminPage = new AdminPage(navigation, car);

  Navigation.setCurrentPage(homePage);

  // when home tab is clicked
  homeTab.addEventListener('click', () => {
    Navigation.setCurrentPage(homePage);
  });


  advTab.addEventListener('click', () => {
    Navigation.setCurrentPage(advertisement);
  });

  poTab.addEventListener('click', () => {
    Navigation.setCurrentPage(purchaseOrderPage);
  });

  adminTab.addEventListener('click', () => {
    Navigation.setCurrentPage(adminPage);
  });
};

startApp();
