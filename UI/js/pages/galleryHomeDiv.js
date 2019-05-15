import Car  from './car.js';
import HomePage from './home.js';
class GalleryHomeDiv{

    constructor(){
        this.homeDiv = document.querySelector('main > div#gallery');
        this.filterDiv = document.querySelector('main > section');
        this.notes = document.querySelectorAll('span.notification');
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




        if(HomePage.Type === 'home'){
            this.notes.forEach(
                (note)=>{
                    note.style.display = 'none';
                }
            );
        }


        if(HomePage.Type === 'po'){

            
            this.filterDiv.style.display = 'none';
            this.notes.forEach(
                (note)=>{
                    note.style.display = 'block';
                }
            );
        }

        if(HomePage.Type === 'adv'){

            
            this.filterDiv.style.display = 'none';
            this.notes.forEach(
                (note)=>{
                    note.style.display = 'block';
                }
            );
        }
        
        
    }

    removePage(){
        
        this.homeDiv.style.display = 'none';
        if( HomePage.Type === 'home'){
            this.filterDiv.style.display = 'none';
        }
        
    }


  



}


export default GalleryHomeDiv;