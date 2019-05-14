import Car  from './car.js';
import Common  from './common.js';
class HomePage extends Common{

    constructor(navigation){
        super();
        navigation.setFirstPage( this );
        this.navigation = navigation;

        this.car = new Car(navigation);
        this.menuButton = document.getElementById('menu-button');
        this.closeButton = document.getElementById('close-button');
        this.homeDiv = document.querySelector('main > div#gallery');
        this.filterDiv = document.querySelector('main > section');
        this.homeTab = document.getElementById('home_tab');

        
        this.aside = document.querySelector('aside');
        this.cards = document.querySelectorAll('.card');


        this.menuButton.addEventListener('click',() => { this.onmenuButtonClicked(event); });
        this.closeButton.addEventListener('click',() => { this.oncloseButtonClicked(event); });

        // when home tab is clicked
        this.homeTab.addEventListener('click',(ev) => { 
            this.navigation.setCurrentPage( this );

            if (window.matchMedia('(max-width: 700px)').matches) {
                this.oncloseButtonClicked(ev);
            }
            
        
        });

        this.cards.forEach(

            (card)=>{
                card.addEventListener('click',() => { this.onCardItemClicked(event); });
            }

        );
    }

    onmenuButtonClicked(ev){
        this.aside.style.display = 'block';
        this.aside.style.width = '100%';
        ev.preventDefault();
    }

    oncloseButtonClicked(ev){
        
        
        this.aside.style.display = 'none';
        this.aside.style.width = '30%';
        ev.preventDefault();
    }

    onCardItemClicked(ev){
        this.navigation.setCurrentPage(this.car);
        ev.preventDefault();
    }

    showPage(){
        this.homeDiv.style.display = 'flex';
        if (!window.matchMedia('(max-width: 700px)').matches) {
            this.filterDiv.style.display = 'flex';
          }
        
        
    }

    removePage(){
        
        this.homeDiv.style.display = 'none';
        this.filterDiv.style.display = 'none';
    }

}

export default HomePage;