import GalleryHomeDiV  from './gallerydiv.js';
import Common  from './common.js';
import HomePage from './home.js';
class AdminPage extends Common{

    constructor(){
        super();
        
        this.galleryHomeDiV = new GalleryHomeDiV();
        
    }

    showPage(){
        document.querySelector('h1').innerHTML = 'Admin';
        HomePage.Type = 'admin';
        this.galleryHomeDiV.showPage();

    }

    removePage(){
        this.galleryHomeDiV.removePage();
    }
}

export default AdminPage;