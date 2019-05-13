class HomePage{

    constructor(){

        this.menuButton = document.getElementById('menu-button');
        this.closeButton = document.getElementById('close-button');
        this.aside = document.querySelector('aside');


        this.menuButton.addEventListener('click',() => { this.onmenuButtonClicked(event); });
        this.closeButton.addEventListener('click',() => { this.oncloseButtonClicked(event); });
        
    }

    onmenuButtonClicked(){
        
        this.aside.style.display = 'block';
        this.aside.style.width = '100%';

    }

    oncloseButtonClicked(){
        
        this.aside.style.display = 'none';
        this.aside.style.width = '30%';
    }

}

export default HomePage;