import GalleryHomeDiV  from './galleryhomediV.js';
import Common  from './common.js';
import HomePage from './home.js';
class PurchaseOrderPage extends Common{

    constructor(){
        super();
        
        this.galleryHomeDiV = new GalleryHomeDiV();
        
    }


    
    showPage(){
        
        
        
        HomePage.Type = 'po';
        this.galleryHomeDiV.showPage();

    }

    removePage(){
        this.galleryHomeDiV.removePage();
    }

    

}

export default PurchaseOrderPage;