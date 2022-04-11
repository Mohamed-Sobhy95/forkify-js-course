import icons from 'url:../../img/icons.svg';
import { View } from './View';
import {Fraction} from 'fractional'
class AddRecipeView extends View {
    _parentElemnt = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay') ;
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal') ; 
    _message = 'recipe uploaded successfully' ; 

    constructor(){
        super();
        this.#showModal();
        this.#hideModal();
    }

    toggleModal(){
        this._window.classList.toggle('hidden');
        this._overlay.classList.toggle('hidden');
    }

    #showModal(){
        this._btnOpen.addEventListener('click',this.toggleModal.bind(this));
    }

    #hideModal(){
        this._btnClose.addEventListener('click',this.toggleModal.bind(this));
        this._overlay.addEventListener('click',this.toggleModal.bind(this));
    }
    addHandlerSubmit(handler){
        this._parentElemnt.addEventListener('submit',function(e){
            e.preventDefault();
            const dataArr = [...(new FormData(this))] ; 
            const data = Object.fromEntries(dataArr);
            handler(data);
        })
    }
         
}
export default new AddRecipeView();