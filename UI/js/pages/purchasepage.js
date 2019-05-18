import GalleryHomeDiV  from './gallerydiv.js';
import Common  from './common.js';
import HomePage from './home.js';
class PurchaseOrderPage extends Common{

    constructor(){
        super();
        
        this.galleryHomeDiV = new GalleryHomeDiV();
        
    }


    
    showPage(){
        
        
        document.querySelector('h1').innerHTML = 'Purchase Orders';        
        HomePage.Type = 'po';
        this.galleryHomeDiV.showPage();

    }

    removePage(){
        this.galleryHomeDiV.removePage();
    }

    

}

export default PurchaseOrderPage;