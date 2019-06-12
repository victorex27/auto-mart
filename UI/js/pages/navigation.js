import Common from './common.js';

// tabs in the aside block
const homeTab = document.getElementById('home_tab');
const advTab = document.getElementById('adv_tab');
const poTab = document.getElementById('po_tab');
const adminTab = document.getElementById('admin_tab');
const aside = document.querySelector('aside');
const main = document.querySelector('main');
const rippleDiv = document.querySelector('#ripple');
const backButtonMobile = document.querySelector('#back-button-mobile');
const backButtonFullScreen = document.querySelector('#back-button-fullscreen');
const oncloseButtonClicked = () => {
  if (window.matchMedia('(max-width: 900px)').matches) {
    aside.classList.remove('slide-right');
  }
};

rippleDiv.addEventListener('animationend', () => {
  rippleDiv.classList.remove('ripple');
  main.style.opacity = '1';
}, false);


const animationStart = () => {
  main.style.opacity = '0';
};

rippleDiv.addEventListener('animationstart', animationStart, false);

class Navigation {
  constructor() {
    // backlog to track page last visited page
    this.backlog = [];
    this.oldTab = homeTab;
    this.oldTab.classList.add('current');
  }

  onChangeActiveTab(newTab) {
    this.oldTab.classList.remove('current');
    newTab.classList.add('current');
    this.oldTab = newTab;
  }

  setCurrentPage(currentPage) {
    const sizeOfBacklog = this.backlog.length;
    const lastPage = this.backlog[sizeOfBacklog - 1];
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
            this.onChangeActiveTab(homeTab);

            break;
          case 'po':

            pageTitle = 'Update Purchase Order';
            this.onChangeActiveTab(poTab);

            break;
          case 'admin':
            pageTitle = 'View Adverts';
            this.onChangeActiveTab(adminTab);
            break;

          case 'adv':
            pageTitle = 'Update Ad';
            this.onChangeActiveTab(advTab);

            break;

          default:
            pageTitle = 'Cars';
            break;
        }
        document.querySelector('h1').innerHTML = pageTitle;
      } else {
        this.setPageTitle(currentPage);
      }
      Navigation.showRippleAnimation(currentPage);
      this.backlog.push(currentPage);
    }
    if (sizeOfBacklog > 0) {
      if (window.matchMedia('(max-width: 900px)').matches) {
        backButtonMobile.classList.remove('no-display');
      } else {
        backButtonFullScreen.classList.remove('no-display');
      }
    }
    oncloseButtonClicked();


    // rippleDiv.style.webkitAnimationName = 'ripple';
    // rippleDiv.style.AnimationName = 'ripple';
  }

  setLastPage() {
    const sizeOfBacklog = this.backlog.length;
    const lastPage = this.backlog[sizeOfBacklog - 1];
    const currentPage = this.backlog[sizeOfBacklog - 2];
    const nextPage = this.backlog[sizeOfBacklog - 3];
    let pageTitle = 'home';
    if (currentPage instanceof Common) {
      lastPage.removePage();
      if (sizeOfBacklog > 2 && lastPage.getName() === 'car') {
        switch (currentPage.getName()) {
          case 'home':
            pageTitle = 'Home';
            this.onChangeActiveTab(homeTab);
            break;
          case 'po':
            pageTitle = 'Purchase Order';
            this.onChangeActiveTab(poTab);

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
            this.onChangeActiveTab(homeTab);
            break;
          case 'po':
            pageTitle = 'Update Purchase order';
            this.onChangeActiveTab(poTab);

            break;
          case 'admin':
            pageTitle = 'View adverts';
            this.onChangeActiveTab(adminTab);
            break;

          case 'adv':
            pageTitle = 'Update your ads';
            this.onChangeActiveTab(advTab);
            break;

          default:
            pageTitle = 'Cars';
            break;
        }
      } else if (sizeOfBacklog === 2) {
        pageTitle = 'home';
        this.onChangeActiveTab(homeTab);
      }

      document.querySelector('h1').innerHTML = pageTitle;


      this.backlog.pop();
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

  setPageType(type) {
    this.type = type;
  }

  getPageType() {
    return this.type;
  }

  setPageTitle(page) {
    let pageTitle;
    switch (page.getName()) {
      case 'home':
        pageTitle = 'home';
        this.onChangeActiveTab(homeTab);
        break;
      case 'po':
        pageTitle = 'purchase Order';
        this.onChangeActiveTab(poTab);

        break;
      case 'admin':
        pageTitle = 'admin';
        this.onChangeActiveTab(adminTab);
        break;

      case 'adv':
        pageTitle = 'your Ads';
        this.onChangeActiveTab(advTab);
        break;

      default:
        pageTitle = 'Cars';
        break;
    }
    document.querySelector('h1').innerHTML = pageTitle;
  }

  static showRippleAnimation(currentPage) {
    rippleDiv.classList.add('ripple');
    // main.style.opacity = '0';
    currentPage.showPage();
  }
}

export default Navigation;
