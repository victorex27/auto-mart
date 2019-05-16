import Advertisement  from './advertisement.js';
import PurchaseOrderPage  from './purchaseorderpage.js';
import AdminPage  from './AdminPage.js';
import GalleryHomeDiV  from './galleryhomediV.js';
import Common  from './common.js';

let purchaseOrderPage = new PurchaseOrderPage();
class HomePage extends Common{

    constructor(navigation){
        super();
        
        

        // HomePage.Navigation = navigation ;

        
        this.advertisement = new Advertisement(navigation);
    
        this.menuButton = document.getElementById('menu-button');
        this.closeButton = document.getElementById('close-button');
        // this.homeDiv = document.querySelector('main > div#gallery');
        // this.filterDiv = document.querySelector('main > section');
        
        // tabs in the aside block
        this.homeTab = document.getElementById('home_tab');
        this.advTab = document.getElementById('adv_tab');
        this.poTab = document.getElementById('po_tab');
        this.adminTab = document.getElementById('admin_tab');

        this.activeTab = this.homeTab;

        // Get gallery plus filter div
        this.galleryHomeDiV = new GalleryHomeDiV('home',navigation);
        
        this.aside = document.querySelector('aside');
        


        this.menuButton.addEventListener('click',() => { this.onmenuButtonClicked(event); });
        this.closeButton.addEventListener('click',() => { this.oncloseButtonClicked(event); });

        // when home tab is clicked
        this.homeTab.addEventListener('click',(ev) => { 
           
            this.onSetCurrentPage(ev,this);  
            this.onChangeActiveTab(ev.srcElement);      
        
        });

        

        this.advTab.addEventListener('click',(ev) => { 
            this.onSetCurrentPage(ev,this.advertisement);
            this.onChangeActiveTab(ev.srcElement);
        });

        this.poTab.addEventListener('click',(ev) => { 
            
            this.onSetCurrentPage(ev,purchaseOrderPage);
            this.onChangeActiveTab(ev.srcElement);
        });

        this.adminTab.addEventListener('click',(ev) => { 
            
            this.onSetCurrentPage(ev,new AdminPage() );
            this.onChangeActiveTab(ev.srcElement);
        });
        HomePage.Navigation = navigation;
        navigation.setFirstPage( this );
        
    }

    onChangeActiveTab( newTab ){

        this.activeTab.classList.remove('current');
        this.activeTab = newTab;
        this.activeTab.classList.add('current');
    }
    // refactor this with that in galleryHomeDiv
    onSetCurrentPage(ev,obj){
        HomePage.Navigation.setCurrentPage( obj );
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


    static set Navigation( navigation ){
        this._navigation = navigation;
    }

    static get Navigation (){

        return this._navigation;
    }

    static set Type( type ){
        
        this._type = type;
    }

    static get Type(){

        return this._type;
    }

    showPage(){
        // this.homeDiv.style.display = 'flex';
        // if (!window.matchMedia('(max-width: 700px)').matches) {
        //     this.filterDiv.style.display = 'flex';
        //   }

        HomePage.Type = 'home';
        
          this.galleryHomeDiV.showPage();
        
    }

    removePage(){
        
        // this.homeDiv.style.display = 'none';
        // this.filterDiv.style.display = 'none';

        this.galleryHomeDiV.removePage();
    }

}

export default HomePage;