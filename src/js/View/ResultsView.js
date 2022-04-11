import icons from 'url:../../img/icons.svg';
import {Fraction} from 'fractional'
import { View } from './View';
import PreviewView from './PreviewView.js';
class ResultsView extends View {
    _parentElemnt = document.querySelector('.results');
    _Errormessage = `we couldn't find your request please try again with other request`;
    _message = '';
        
    
    _generateMarkUp(){
      
      return this._data.map(result=>PreviewView.render(result,false)).join('\n');
    } 
}
export default new ResultsView();