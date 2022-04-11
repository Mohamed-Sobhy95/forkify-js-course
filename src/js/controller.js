import 'core-js/stable' ; 
import 'regenerator-runtime' ;
import { HIDE_TIMEOUT } from './config.js';
import * as model from './model.js' ; 
import addRecipeView from './View/addRecipeView.js';
import BookmarksView from './View/BookmarksView.js';
import paginationView from './View/paginationView.js';
import RecipeView from './View/RecipeView.js';
import ResultsView from './View/ResultsView.js';
import searchView from './View/searchView.js';
import {Fraction} from 'fractional'

const controlRecipes = async function () {
  try {

    const id = window.location.hash.slice(1) ;
    if(!id || id==='') return ;
    ResultsView.update(model.getPageResults());
    RecipeView.renderSpinner();
    await model.loadRecipe(id);
    //display recipe 
    RecipeView.render(model.state.recipe);
    BookmarksView.update(model.state.bookmarks)
  } catch (error) {
    // alert(error );
    RecipeView.displayError();
  }
}
const controlPage = function(page){
      ResultsView.render(model.getPageResults(page));
      paginationView.render(model.state.search);
}
const controlSearch = async function(){
  try {
    //get query
    ResultsView.renderSpinner();
    const query = searchView.getQuery();
    if(!query || query=='') return;

    await model.getSearch(query);
    
    controlPage(1);

  } catch (error) {
    console.log(error);
  }
}

const controlServings = function(servings){
  model.updateServings(servings) ; 
  RecipeView.update(model.state.recipe);
}

const controlBookmark = function(){
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe)
  } else {
    model.removeBookmark(model.state.recipe.id)
  }

  BookmarksView.render(model.state.bookmarks);
  RecipeView.update(model.state.recipe);

}
const Bookmarkload = function(){
    BookmarksView.render(model.state.bookmarks);
}

const addRecipeHandler = async function(data){
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(data);
    
    //display recipe 
    RecipeView.render(model.state.recipe) ; 

    //show success message
    addRecipeView.displayMessage();
    
    BookmarksView.render(model.state.bookmarks) ;
    window.history.pushState(null,'',`#${model.state.recipe.id}`)
    //hide
    setTimeout(function(){
      addRecipeView.toggleModal();
    },HIDE_TIMEOUT*1000);


  } catch (error) {
    addRecipeView.displayError(error.message);
  }
}

const init = function(){
  RecipeView.addRenderHandler(controlRecipes);
  RecipeView.addServingHandler(controlServings);
  RecipeView.addHandlerBookmark(controlBookmark)
  searchView.addHandlerSearch(controlSearch);
  paginationView.addClickHandler(controlPage);
  BookmarksView.addHandlerRender(Bookmarkload);
  addRecipeView.addHandlerSubmit(addRecipeHandler)
}

init();