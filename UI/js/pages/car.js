import Common  from './common.js';
class Car extends Common{

    constructor(navigation){
        super();
        this.navigation = navigation;
        
        this.carDiv = document.getElementById('single-car');
        
    }

    showPage(){

        this.carDiv.style.display = 'flex';
        this.carDiv.classList.remove('is-not-visible');

    }

    removePage(){
        this.carDiv.style.display = 'none';
        this.carDiv.classList.add('is-not-visible');
    }

}

export default Car;