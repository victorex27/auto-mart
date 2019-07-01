const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const signUpFormEmail = document.querySelector('#email_su');
const signUpFormFirstName = document.querySelector('#first_name_su');
const signUpFormLastName = document.querySelector('#last_name_su');
const signUpFormPassword = document.querySelector('#password_su');
const signUpFormAddress = document.querySelector('#address_su');
const signUpErrorSpan = document.querySelector('#sign_up_error');
const signUpLoader = document.querySelector('#sign_up_loader');


const openSignUpPage = () => {
  overlay.classList.add('slide-down');
  modal.classList.add('slide-down');
};

const closeSignUpPage = () => {
  modal.classList.remove('slide-down');
  overlay.classList.remove('slide-down');
  // if (window.matchMedia('(max-width: 900px)').matches) {}
};

const createUser = (ev) => {
  signUpLoader.style.display = 'inline-block';
  const api = 'http://localhost:3000/api/v2/auth/signup';
  // const api = 'https://quiet-earth-51065.herokuapp.com/api/v2/auth/signup/';
  const headers = new Headers();
  headers.set('Content-type', 'application/json');
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Headers', 'X-Requested-With');

  // make API call here
  fetch(api,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email: signUpFormEmail.value,
        firstName: signUpFormFirstName.value,
        lastName: signUpFormLastName.value,
        password: signUpFormPassword.value,
        address: signUpFormAddress.value,
      }),

    }).then(resp => resp.json()).then((result) => {
    const { status } = result;
    if (status === 201) {
      const { email, token } = result.data;

      localStorage.setItem('email', email);
      localStorage.setItem('token', token);
      window.location.replace('./cars.html');
      return;
    }

    const { error } = result;

    signUpErrorSpan.textContent = error;
  })
    .catch(() => {
    })
    .finally(() => {
      signUpLoader.style.display = 'none';
    });


  ev.preventDefault();
};


const startApp = () => {
  /** Show Sign up form */
  const signUpForm = document.querySelector('#sign_up_form');
  signUpErrorSpan.textContent = '';
  signUpForm.addEventListener('submit', createUser);

  const getStartedButton = document.querySelector('button#get-started');
  if (!getStartedButton) return;

  getStartedButton.addEventListener('click', () => { openSignUpPage(); });
  // close sign up div
  const closeSignUPButton = document.querySelector('button#close-sign-up-div');

  if (!closeSignUPButton) return;

  closeSignUPButton.addEventListener('click', () => { closeSignUpPage(); });
};


startApp();
