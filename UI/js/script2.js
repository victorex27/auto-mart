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
const backButton = document.getElementById('back-button');


// let activeTab = homeTab;
const navigation = new Navigation();
// event listeners
const onmenuButtonClicked = () => {
  aside.style.display = 'block';
  aside.style.width = '100%';
};

const onBackButtonClicked = () => {
  navigation.setLastPage();
};

const oncloseButtonClicked = () => {
  if (window.matchMedia('(max-width: 700px)').matches) {
    aside.style.display = 'none';
    aside.style.width = '30%';
  }
};

const onFilterListButtonClicked = () => {
  section.style.display = 'block';
  section.style.position = 'absolute';
  section.style.top = '0';
  section.style.left = '0';
  section.style.width = '100%';
  section.style.height = '100vh';

};

const onCloseFilterButtonClicked = () => {
  section.style.display = 'none';
};

menuButton.addEventListener('click', onmenuButtonClicked);
closeButton.addEventListener('click', oncloseButtonClicked);
backButton.addEventListener('click', onBackButtonClicked);
filterListButton.addEventListener('click', onFilterListButtonClicked);
closeFilterButton.addEventListener('click', onCloseFilterButtonClicked);
const startApp = () => {
  const car = new Car(navigation);
  const galleryDiv = new GalleryDiv(navigation, car);

  const homePage = new HomePage(navigation, galleryDiv);
  const purchaseOrderPage = new PurchaseOrderPage(navigation, galleryDiv);
  const advertisement = new Advertisement(navigation, galleryDiv);
  const adminPage = new AdminPage(navigation, galleryDiv);

  navigation.setCurrentPage(homePage);

  // when home tab is clicked
  homeTab.addEventListener('click', () => {
    navigation.setCurrentPage(homePage);
  });


  advTab.addEventListener('click', () => {
    navigation.setCurrentPage(advertisement);
  });

  poTab.addEventListener('click', () => {
    navigation.setCurrentPage(purchaseOrderPage);
  });

  adminTab.addEventListener('click', () => {
    navigation.setCurrentPage(adminPage);
  });
};

startApp();
