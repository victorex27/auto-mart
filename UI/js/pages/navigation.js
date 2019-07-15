import Common from './common.js';

// tabs in the aside block
const homeTab = document.getElementById('home_tab');
const advTab = document.getElementById('adv_tab');
const poTab = document.getElementById('po_tab');
const adminTab = document.getElementById('admin_tab');
const aside = document.querySelector('aside');
const backButtonMobile = document.querySelector('#back-button-mobile');
const backButtonFullScreen = document.querySelector('#back-button-fullscreen');
const oncloseButtonClicked = () => {
  if (window.matchMedia('(max-width: 900px)').matches) {
    aside.classList.remove('slide-right');
  }
};

const backlog = [];
let oldTab = homeTab;
oldTab.classList.add('current');
class Navigation {
  static onChangeActiveTab(newTab) {
    oldTab.classList.remove('current');
    newTab.classList.add('current');
    oldTab = newTab;
  }

  static setCurrentPage(currentPage) {
    const sizeOfBacklog = backlog.length;
    const lastPage = backlog[sizeOfBacklog - 1];
    if (sizeOfBacklog > 0) {
      if (lastPage instanceof Common && lastPage !== currentPage) {
        lastPage.removePage();
      }
    }

    if (currentPage instanceof Common && lastPage !== currentPage) {
      if (currentPage.getName() === 'car') {
        let pageTitle;
        switch (lastPage.getName()) {
          case 'home':

            pageTitle = 'Make Purchase Order';
            Navigation.onChangeActiveTab(homeTab);

            break;
          case 'po':

            pageTitle = 'Update Purchase Order';
            Navigation.onChangeActiveTab(poTab);

            break;
          case 'admin':
            pageTitle = 'View Adverts';
            Navigation.onChangeActiveTab(adminTab);
            break;

          case 'adv':
            pageTitle = 'Update Ad';
            Navigation.onChangeActiveTab(advTab);

            break;

          default:
            pageTitle = 'Cars';
            break;
        }
        document.querySelector('h1').innerHTML = pageTitle;
      } else {
        Navigation.setPageTitle(currentPage);
      }
      Navigation.showRippleAnimation(currentPage);
      backlog.push(currentPage);
    }
    if (sizeOfBacklog > 0) {
      if (window.matchMedia('(max-width: 900px)').matches) {
        backButtonMobile.classList.remove('no-display');
      } else {
        backButtonFullScreen.classList.remove('no-display');
      }
    }
    oncloseButtonClicked();
    currentPage.showPage();
  }

  static setLastPage() {
    const sizeOfBacklog = backlog.length;
    const lastPage = backlog[sizeOfBacklog - 1];
    const currentPage = backlog[sizeOfBacklog - 2];
    const nextPage = backlog[sizeOfBacklog - 3];
    let pageTitle = 'home';
    if (currentPage instanceof Common) {
      lastPage.removePage();
      if (sizeOfBacklog > 2 && lastPage.getName() === 'car') {
        switch (currentPage.getName()) {
          case 'home':
            pageTitle = 'Home';
            Navigation.onChangeActiveTab(homeTab);
            break;
          case 'po':
            pageTitle = 'Purchase Order';
            Navigation.onChangeActiveTab(poTab);

            break;
          case 'admin':
            pageTitle = 'Admin';
            break;

          case 'adv':
            pageTitle = 'Your Ads';

            break;

          default:
            pageTitle = 'Carsamala';
            break;
        }
      } else if (sizeOfBacklog > 2 && lastPage.getName() !== 'car') {
        switch (nextPage.getName()) {
          case 'home':
            pageTitle = 'Make Purchase Order';
            Navigation.onChangeActiveTab(homeTab);
            break;
          case 'po':
            pageTitle = 'Update Purchase order';
            Navigation.onChangeActiveTab(poTab);

            break;
          case 'admin':
            pageTitle = 'View adverts';
            Navigation.onChangeActiveTab(adminTab);
            break;

          case 'adv':
            pageTitle = 'Update your ads';
            Navigation.onChangeActiveTab(advTab);
            break;

          default:
            pageTitle = 'Cars';
            break;
        }
      } else if (sizeOfBacklog === 2) {
        pageTitle = 'home';
        Navigation.onChangeActiveTab(homeTab);
      }

      document.querySelector('h1').innerHTML = pageTitle;


      backlog.pop();
    }

    if (sizeOfBacklog === 2) {
      if (window.matchMedia('(max-width: 900px)').matches) {
        backButtonMobile.classList.add('no-display');
      } else {
        backButtonFullScreen.classList.add('no-display');
      }
    }
    Navigation.showRippleAnimation(currentPage);
  }

  static setPageType(type) {
    Navigation.type = type;
  }

  static getPageType() {
    return Navigation.type;
  }

  static setPageTitle(page) {
    let pageTitle;
    switch (page.getName()) {
      case 'home':
        pageTitle = 'home';
        Navigation.onChangeActiveTab(homeTab);
        break;
      case 'po':
        pageTitle = 'purchase Order';
        Navigation.onChangeActiveTab(poTab);

        break;
      case 'admin':
        pageTitle = 'admin';
        Navigation.onChangeActiveTab(adminTab);
        break;

      case 'adv':
        pageTitle = 'your Ads';
        Navigation.onChangeActiveTab(advTab);
        break;

      default:
        pageTitle = 'Cars';
        break;
    }
    document.querySelector('h1').innerHTML = pageTitle;
  }

  static showRippleAnimation(currentPage) {
    currentPage.showPage();
  }
}

export default Navigation;
