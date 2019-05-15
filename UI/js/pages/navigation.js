import Common from './common.js';
class Navigation{

    
    constructor( ){

        //backlog to track page last visited page 
        this.backlog = [];
        
        // parent div
        // this.container = document.querySelector('main');
        
        // this.adTab = document.getElementById('ad_tab');
        // this.poTab = document.getElementById('po_tab');
        // this.adminTab = document.getElementById('admin_tab');
    
    }

    setFirstPage(currentPage ){
        // value here is the first page
        if( currentPage instanceof Common){
            currentPage.showPage();
            this.backlog.push(currentPage);
        }
        
    }



    setCurrentPage(currentPage){
        const sizeOfBacklog = this.backlog.length;
        if( sizeOfBacklog  > 0){
            const lastPage = this.backlog[ sizeOfBacklog  - 1];
            if( lastPage instanceof Common && lastPage != currentPage){
                lastPage.removePage();
            }
        }
        
        if( currentPage instanceof Common){
            currentPage.showPage();
            this.backlog.push(currentPage);
        }
        

    }


    

    // onHomeMenuClicked(){    home.onShowHomeDiv();}

    // onExitHomeDiv(){   home.onRemoveHomeDiv();}

    // onPurchaseOrderClicked(){}

    // onAdvertisementClicked(){}
    // onAdminClicked(){}
}

export default Navigation;