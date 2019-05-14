const inputFields = document.querySelectorAll('input[type=text],input[type=number],input[type=email],input[type=password], textarea');
const inputFieldOnFocusListener = (event) =>{

    const element = event.srcElement;
    const label = element.parentNode.firstChild;
    
    console.log(element.nextSibling);
    /** move sibling on top of the inputfield */  
    setLabelTransformForPropertyForm(label,'0','1em');
    
    event.preventDefault();
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


    /** input field animation */

    inputFields.forEach((inputField)=>{
        inputField.addEventListener('focus', () => { inputFieldOnFocusListener(event); });
        inputField.addEventListener('blur', () => { inputFieldOnBlurListener(event); });
    });
