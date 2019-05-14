import Car  from './car.js';
import Advertisement  from './advertisement.js';
import Common  from './common.js';
class HomePage extends Common{

    constructor(navigation){
        super();
        navigation.setFirstPage( this );
        this.navigation = navigation;

        

        this.car = new Car(navigation);
        this.advertisement = new Advertisement(navigation);
        this.menuButton = document.getElementById('menu-button');
        this.closeButton = document.getElementById('close-button');
        this.homeDiv = document.querySelector('main > div#gallery');
        this.filterDiv = document.querySelector('main > section');
        this.homeTab = document.getElementById('home_tab');
        this.advTab = document.getElementById('adv_tab');

        this.activeTab = this.homeTab;
        
        this.aside = document.querySelector('aside');
        this.cards = document.querySelectorAll('.card');


        this.menuButton.addEventListener('click',() => { this.onmenuButtonClicked(event); });
        this.closeButton.addEventListener('click',() => { this.oncloseButtonClicked(event); });

        // when home tab is clicked
        this.homeTab.addEventListener('click',(ev) => { 
           
            this.onSetCurrentPage(ev,this);  
            this.onChangeActiveTab(ev.srcElement);      
        
        });

        this.cards.forEach(

            (card)=>{
                card.addEventListener('click',(ev) => { this.onSetCurrentPage(ev,this.car); });
            }

        );

        this.advTab.addEventListener('click',(ev) => { 
            this.onSetCurrentPage(ev,this.advertisement);
            this.onChangeActiveTab(ev.srcElement);
        });
    }

    onChangeActiveTab( newTab ){

        this.activeTab.classList.remove('current');
        this.activeTab = newTab;
        this.activeTab.classList.add('current');
    }

    onSetCurrentPage(ev,obj){
        this.navigation.setCurrentPage( obj );
        if (window.matchMedia('(max-width: 700px)').matches) {
            this.oncloseButtonClicked(ev);
        }
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