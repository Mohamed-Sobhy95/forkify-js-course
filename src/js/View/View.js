
import icons from 'url:../../img/icons.svg';
import {Fraction} from 'fractional'
export class View{
    _data;
    _clear(){
        this._parentElemnt.innerHTML ='';
    }
    
    displayError(message = this._Errormessage){
        const markup = `
         <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
         this._clear(); 
        this._parentElemnt.insertAdjacentHTML("afterbegin",markup);
    }


    displayMessage(message = this._message){
        const markup = `
         <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
         this._clear(); 
        this._parentElemnt.insertAdjacentHTML("afterbegin",markup);
    }

    renderSpinner(){

         const spinner =`
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>`;

        this._clear();
        this._parentElemnt.insertAdjacentHTML('afterbegin',spinner);
    }

    render(data ,render=true){
        if(!data || (Array.isArray(data)&&data.length === 0)) return this.displayError() ;
        this._data = data;
        const temp =this._generateMarkUp();
        if (!render) {
            return temp ;
        }
        this._clear(); 
        this._parentElemnt.insertAdjacentHTML("afterbegin",temp);
    }

    update(data){
        this._data = data;
        const newMarkup =this._generateMarkUp(); 
        const curElements =Array.from(this._parentElemnt.querySelectorAll('*'));
        const newElements =Array.from(document.createRange().createContextualFragment(newMarkup).querySelectorAll('*'));

        // console.log(newElements);
        newElements.forEach((newEL,i)=>{
            const curEl = curElements[i] ;
            
            if(!newEL.isEqualNode(curEl) && curEl.firstChild?.nodeValue.trim()!==''){
                curEl.textContent = newEL.textContent ; 
            }

            if(!newEL.isEqualNode(curEl)){
                const attributes = Array.from(newEL.attributes) ;
                attributes.forEach(att=>{
                    curEl.setAttribute(att.name,att.value)
                })
            }
            
        })

        
    }

}