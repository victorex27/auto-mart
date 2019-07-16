const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const signUpFormEmail = document.querySelector('#email_su');
const signUpFormFirstName = document.querySelector('#first_name_su');
const signUpFormLastName = document.querySelector('#last_name_su');
const signUpFormPassword = document.querySelector('#password_su');
const signUpFormAddress = document.querySelector('#address_su');
const signUpErrorSpan = document.querySelector('#sign_up_error');
const signUpLoader = document.querySelector('#sign_up_loader');

const signInFormEmail = document.querySelector('#email_si');
const signInFormPassword = document.querySelector('#password_si');
const signInErrorSpan = document.querySelector('#sign_in_error');
const signInLoader = document.querySelector('#sign_in_loader');

const openSignUpPage = () => {
  overlay.classList.add('slide-down');
  modal.classList.add('slide-down');
};

const closeSignUpPage = () => {
  modal.classList.remove('slide-down');
  overlay.classList.remove('slide-down');
  // if (window.matchMedia('(max-width: 900px)').matches) {}
};

const retrieveFromApi = (data) => {
  const {
    ev, api, body, statusCode, errorDiv, loaderDiv,
  } = data;
  ev.preventDefault();
  const loaderSpan = loaderDiv;
  const errorSpan = errorDiv;
  loaderSpan.style.display = 'inline-block';
  const headers = new Headers();
  headers.set('Content-type', 'application/json');
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Headers', 'X-Requested-With');

  // make API call here
  fetch(api,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(body),

    }).then(resp => resp.json()).then((result) => {
    const { status } = result;
    if (status === statusCode) {
      const { email, token } = result.data;

      localStorage.setItem('email', email);
      localStorage.setItem('token', token);
      window.location.href = './cars.html';
      return;
    }

    const { error } = result;

    errorSpan.textContent = error;
  })
    .catch(() => {
    })
    .finally(() => {
      loaderSpan.style.display = 'none';
    });
};

const createUser = (ev) => {
  const api = 'https://quiet-earth-51065.herokuapp.com/api/v1/auth/signup';
  // const api = 'https://quiet-earth-51065.herokuapp.com/api/v1/auth/signup';
  const body = {
    email: signUpFormEmail.value,
    firstName: signUpFormFirstName.value,
    lastName: signUpFormLastName.value,
    password: signUpFormPassword.value,
    address: signUpFormAddress.value,
  };
  const data = {
    ev,
    api,
    body,
    statusCode: 201,
    errorDiv: signUpErrorSpan,
    loaderDiv: signUpLoader,

  };
  retrieveFromApi(data);
};


const SignInUser = (ev) => {
  const api = 'https://quiet-earth-51065.herokuapp.com/api/v1/auth/signin';
  // const api = 'https://quiet-earth-51065.herokuapp.com/api/v1/auth/signin';
  const body = {
    email: signInFormEmail.value,
    password: signInFormPassword.value,
  };
  const data = {
    ev,
    api,
    body,
    statusCode: 200,
    errorDiv: signInErrorSpan,
    loaderDiv: signInLoader,

  };
  retrieveFromApi(data);
};


const startApp = () => {
  /** Show Sign up form */
  const signUpForm = document.querySelector('#sign_up_form');
  const signInForm = document.querySelector('#sign_in_form');
  signUpErrorSpan.textContent = '';
  signInErrorSpan.textContent = '';
  signUpForm.addEventListener('submit', createUser);
  signInForm.addEventListener('submit', SignInUser);

  const getStartedButton = document.querySelector('button#get-started');
  if (!getStartedButton) return;

  getStartedButton.addEventListener('click', () => { openSignUpPage(); });
  // close sign up div
  const closeSignUPButton = document.querySelector('button#close-sign-up-div');

  if (!closeSignUPButton) return;

  closeSignUPButton.addEventListener('click', () => { closeSignUpPage(); });
};


startApp();
