const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

const openSignUpPage = () => {
  overlay.classList.add('slide-down');
  modal.classList.add('slide-down');
};

const closeSignUpPage = () => {
  modal.classList.remove('slide-down');
  overlay.classList.remove('slide-down');
  if (window.matchMedia('(max-width: 900px)').matches) {
    // mainDiv.style.display = 'block';
  }
};


const startApp = () => {
  /** Show Sign up form */

  const getStartedButton = document.querySelector('button#get-started');
  if (!getStartedButton) return;

  getStartedButton.addEventListener('click', () => { openSignUpPage(); });
  // close sign up div
  const closeSignUPButton = document.querySelector('button#close-sign-up-div');

  if (!closeSignUPButton) return;

  closeSignUPButton.addEventListener('click', () => { closeSignUpPage(); });
};


startApp();
