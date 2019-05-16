import Car  from './car.js';
import HomePage from './home.js';
class GalleryHomeDiv{

    constructor(){
        this.homeDiv = document.querySelector('main > div#gallery');
        this.filterDiv = document.querySelector('main > section');
        this.notes = document.querySelectorAll('span.notification');
        this.isSoldDiv = document.querySelectorAll('span.is-sold-span');
        this.cards = document.querySelectorAll('.card');
        
        // type takes the page that is creating the view
        // and displays the equivalent elements that are needed
        
        this.car = new Car();

        this.cards.forEach(

            (card)=>{
                card.addEventListener('click',(ev) => { 
            
                    HomePage.Navigation.setCurrentPage( this.car );
                 });
            }

        );

    }

    showPage(){
        this.homeDiv.style.display = 'flex';

        if (!window.matchMedia('(max-width: 700px)').matches && HomePage.Type === 'home') {
            this.filterDiv.style.display = 'flex';
            
            
            
        }

        switch(HomePage.Type){
            case 'home':{
                this.removeNotificationDiv();
                this.removeSoldStatus();
            }
            break;

            case 'po':{
                this.removeSoldStatus();
                this.removeFilterDiv();
                this.showNotificationDiv();
            }

            break;

            case 'adv':{
                this.removeSoldStatus();
                this.removeFilterDiv();
                this.showNotificationDiv();
           
            }

            break;

            case 'admin' :{
                this.showSoldStatus();
                this.removeFilterDiv();
                this.removeNotificationDiv();
            }

            break;


        }
                        
    }

    removePage(){

        this.homeDiv.style.display = 'none';
        if( HomePage.Type === 'home'){
            this.removeFilterDiv();
        }
        
    }


    removeFilterDiv(){
        this.filterDiv.style.display = 'none';
    }

    showNotificationDiv(){
        this.notes.forEach(
            (span)=>{
                span.style.display = 'block';
            }
        );
    }

    removeNotificationDiv(){
        this.notes.forEach(
            (span)=>{
                span.style.display = 'none';
            }
        );
    }


    showSoldStatus(){
        this.isSoldDiv.forEach(
            (span)=>{
                span.style.display = 'block';
            }
        );
    }
    removeSoldStatus(){
        this.isSoldDiv.forEach(
            (span)=>{
                span.style.display = 'none';
            }
        );

    }

}

export default GalleryHomeDiv;