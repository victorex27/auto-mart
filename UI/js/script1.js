const signUpDiv = document.querySelector('aside');
const mainDiv = document.querySelector('main');
const inputFields = document.querySelectorAll('input, textarea');
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

const inputFieldOnFocusListener = (event) =>{

    const element = event.srcElement;
    const label = element.parentNode.firstChild;
    
    /** move sibling on top of the inputfield */  
    setLabelTransformForPropertyForm(label,'0','1em');
	
}

const inputFieldOnBlurListener = (event) =>{
    const element = event.srcElement;
    if(! element.value){
        const label = element.parentNode.firstChild;
       /** move sibling on top of the inputfield */  
         setLabelTransformForPropertyForm(label,'130','0.8em');
    }
    
}

const setLabelTransformForPropertyForm = (label, transformValue,fontSize)=>{

    const transfromToString = `translateY(${transformValue}%)` ;
    label.style.fontSize = fontSize;
    label.style.transform = transfromToString;
    label.style.webkitTransform = transfromToString;
    label.style.oTransform = transfromToString;
    label.style.msTransform = transfromToString;
    label.style.mozTransform = transfromToString;
}

const startApp = () => {
    /** Show Sign up form */

    const getStartedButton = document.querySelector('button#get-started');
    if(!getStartedButton) return;
    
    getStartedButton.addEventListener('click', () => { openSignUpPage(); });
    //close sign up div    
    const closeSignUPButton = document.querySelector('button#close-sign-up-div');
    
    if(!closeSignUPButton) return;
    
    closeSignUPButton.addEventListener('click', () => { closeSignUpPage(); });
   
    
    /** input field animation */

    inputFields.forEach((inputField)=>{
        inputField.addEventListener('focus', () => { inputFieldOnFocusListener(event); });
        inputField.addEventListener('blur', () => { inputFieldOnBlurListener(event); });
    });

};


startApp();