const signUpDiv = document.querySelector('aside');
const mainDiv = document.querySelector('main');

const openSignUpPage = () => {
  if (window.matchMedia('(max-width: 700px)').matches) {
    mainDiv.style.display = 'none';
  }
  signUpDiv.style.display = 'flex';
};

const closeSignUpPage = () => {
  signUpDiv.style.display = 'none';
  if (window.matchMedia('(max-width: 700px)').matches) {
    mainDiv.style.display = 'block';
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
