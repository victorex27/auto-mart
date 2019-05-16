import GalleryHomeDiV  from './galleryhomediV.js';
import Common  from './common.js';
import HomePage from './home.js';
class AdminPage extends Common{

    constructor(){
        super();
        
        this.galleryHomeDiV = new GalleryHomeDiV();
        
    }

    showPage(){
        
        HomePage.Type = 'admin';
        this.galleryHomeDiV.showPage();

    }

    removePage(){
        this.galleryHomeDiV.removePage();
    }
}

export default AdminPage;