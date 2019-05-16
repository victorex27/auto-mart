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

        // div for making puchase order, and updating price for both seller and user
        this.makePurchaseOrderDiv = document.getElementById('make-purchase-order');
        this.deletePostDiv = document.getElementById('delete-post-div');
        this.reportPostButton = document.getElementById('report-post');
        
        /* modal */
        this.modalDiv = document.querySelector('.modal');
        this.modalOverlay = document.querySelector('.overlay');
        this.modalCloseButton = document.querySelector('.close-modal');
        this.modalCloseButton.addEventListener( 'click', (ev)=>{
            this.modalDiv.style.display = 'none';
            this.modalOverlay.style.display = 'none';
            ev.preventDefault();
        });

        
        this.reportPostButton.addEventListener( 'click', (ev)=>{ this.onReportPostButton(ev); });
    }


    showPage(){

        
        this.carDiv.style.display = 'flex';
        this.carDiv.classList.remove('is-not-visible');
        this.deletePostDiv.style.display = 'none';

        switch (HomePage.Type) {
            case 'home':
                this.makePurchaseOrderButton.classList.remove('is-not-visible');
                this.updatePurchaseOrderButton.classList.add('is-not-visible')
                this.currentPurchaseOrderDiv.classList.add('is-not-visible');
                this.updateAdvertButton.classList.add('is-not-visible');
                this.isSoldDiv.style.display = 'none';
                this.reportPostButton.style.display = 'none';
                
            break;

            case 'po':
                this.makePurchaseOrderButton.classList.add('is-not-visible');
                this.updatePurchaseOrderButton.classList.remove('is-not-visible');
                this.currentPurchaseOrderDiv.classList.remove('is-not-visible');
                this.updateAdvertButton.classList.add('is-not-visible');
                this.isSoldDiv.style.display = 'none';
                this.reportPostButton.style.display = 'block';
            break;

        
            case 'adv':
                this.makePurchaseOrderButton.classList.add('is-not-visible');
                this.updatePurchaseOrderButton.classList.add('is-not-visible')
                this.currentPurchaseOrderDiv.classList.add('is-not-visible');
                this.updateAdvertButton.classList.remove('is-not-visible');
                this.isSoldDiv.style.display = 'flex';
                this.reportPostButton.style.display = 'none';
            break;
            case 'admin':
                this.makePurchaseOrderDiv.style.display = 'none';
                this.deletePostDiv.style.display = 'flex';
                this.reportPostButton.style.display = 'none';
            break;
            

        }


        

    }

    removePage(){
        this.carDiv.style.display = 'none';
        this.carDiv.classList.add('is-not-visible');
        this.makePurchaseOrderDiv.style.display = 'block';


        switch (HomePage.Type) {
            case 'home':
                this.makePurchaseOrderButton.classList.add('is-not-visible');
                this.updatePurchaseOrderButton.classList.remove('is-not-visible');
                this.currentPurchaseOrderDiv.classList.remove('is-not-visible');
                    
            break;

            case 'po':
                this.makePurchaseOrderButton.classList.remove('is-not-visible');
                this.updatePurchaseOrderButton.classList.add('is-not-visible')
                this.currentPurchaseOrderDiv.classList.add('is-not-visible');
            break;

            case '':
                this.deletePostDiv.style.display = 'none';
            break;

            case 'admin':
                this.makePurchaseOrderDiv.style.display = 'none';
            break

        }

    }

    onReportPostButton(ev){

        this.modalOverlay.style.display = 'block';
        this.modalDiv.style.display = 'flex';
        
        ev.preventDefault();
    }

}

export default Car;