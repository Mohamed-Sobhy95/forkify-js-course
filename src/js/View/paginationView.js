import icons from 'url:../../img/icons.svg';
import { View } from './View';
import {Fraction} from 'fractional'
class PaginationView extends View {
    _parentElemnt = document.querySelector('.pagination');
    _generateMarkUp(){
      const numPages= Math.ceil(this._data.results.length /this._data.perPage) ; 
      const curPage = this._data.page ; 

      if (curPage === 1  && numPages > 1) {
        return this.#generateButton(curPage+1,'next');
      }

      if (curPage === numPages  && numPages > 1) {
        return this.#generateButton(curPage - 1,'prev');
      }
      if (curPage < numPages  ) {
        return `${this.#generateButton(curPage - 1,'prev')}${this.#generateButton(curPage + 1,'next')}`;
      }
      return '';
    } 

    addClickHandler(handler){
      this._parentElemnt.addEventListener('click',function(e){
        const btn = e.target.closest('.btn--inline');
        if(!btn) return ;
        const goto = +btn.dataset.goto ;
        handler(goto);
      })
    }
    #generateButton(goto,type='next'){

      if (!['next','prev'].includes(type.toLowerCase())) {
        type='next'; 
      }
      return `
      <button class="btn--inline pagination__btn--${type.toLowerCase()}" data-goto=${goto}>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${type.toLowerCase()==='prev'?'left':'right'}"></use>
            </svg>
            <span>Page ${goto}</span>
          </button>
      `;
    }
}
export default new PaginationView();