import Common  from './common.js';
import HomePage from './home.js';
class Car extends Common{

    constructor(){
        super();
        
        
        this.makePurchaseOrderButton = document.getElementById('make-purchase-order-button');
        this.updatePurchaseOrderButton = document.getElementById('update-purchase-order-button');
        this.updateAdvertButton = document.getElementById('update-advert-button');
        this.currentPurchaseOrderDiv = document.getElementById('current-purchase-order-div');
        this.isSoldDiv = document.getElementById('is-sold-div');
        this.carDiv = document.getElementById('single-car');

        
    }


    showPage(){

        
        this.carDiv.style.display = 'flex';
        this.carDiv.classList.remove('is-not-visible');

        
        if( HomePage.Type === 'home'){
            
            this.makePurchaseOrderButton.classList.remove('is-not-visible');
            this.updatePurchaseOrderButton.classList.add('is-not-visible')
            this.currentPurchaseOrderDiv.classList.add('is-not-visible');
            this.updateAdvertButton.classList.add('is-not-visible');
            this.isSoldDiv.style.display = 'none';
        }else if (HomePage.Type === 'po'){
            
            this.makePurchaseOrderButton.classList.add('is-not-visible');
            this.updatePurchaseOrderButton.classList.remove('is-not-visible');
            this.currentPurchaseOrderDiv.classList.remove('is-not-visible');
            this.updateAdvertButton.classList.add('is-not-visible');
            this.isSoldDiv.style.display = 'none';

        }else if (HomePage.Type === 'adv'){

             
            this.makePurchaseOrderButton.classList.add('is-not-visible');
            this.updatePurchaseOrderButton.classList.add('is-not-visible')
            this.currentPurchaseOrderDiv.classList.add('is-not-visible');
            this.updateAdvertButton.classList.remove('is-not-visible');
            this.isSoldDiv.style.display = 'flex';
        }

        

    }

    removePage(){
        this.carDiv.style.display = 'none';
        this.carDiv.classList.add('is-not-visible');
        if( HomePage.Type === 'home'){

            this.makePurchaseOrderButton.classList.add('is-not-visible');
            this.updatePurchaseOrderButton.classList.remove('is-not-visible');
            this.currentPurchaseOrderDiv.classList.remove('is-not-visible');

        }else if (HomePage.Type === 'po'){
            this.makePurchaseOrderButton.classList.remove('is-not-visible');
            this.updatePurchaseOrderButton.classList.add('is-not-visible')
            this.currentPurchaseOrderDiv.classList.add('is-not-visible');
        }

    }

}

export default Car;