import icons from 'url:../../img/icons.svg';
import {Fraction} from 'fractional'
import { View } from './View';
import PreviewView from './PreviewView';

class BookmarksView extends View {
    _parentElemnt = document.querySelector('.bookmarks__list');
    _Errormessage = `no bookmarks available choose a nice recipe to display`;
    _message = '';
        

    _generateMarkUp(){

      return this._data.map(bookmark=>PreviewView.render(bookmark,false)).join('\n');
    } 

    addHandlerRender(handle){
      window.addEventListener('load',handle) ;
    }

}
export default new BookmarksView();