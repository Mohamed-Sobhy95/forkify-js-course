import { async } from 'regenerator-runtime';
import {API_URL, KEY, RES_PER_PAGE} from './config.js'
import { AJAX, getJson, sendJson } from './helper.js';

export const state= {
  recipe:{},
  search:{
    query:'',
    results:[],
    perPage : RES_PER_PAGE,
    page : 1,
  },
  bookmarks:[],
};
const createObject = function(data){
  const {recipe} = data.data ;
    return {
      id:recipe.id , 
      title : recipe.title,
      publisher : recipe.publisher,
      image : recipe.image_url,
      ingredients : recipe.ingredients,
      servings : recipe.servings,
      sourceUrl :recipe.source_url,
      cookingTime : recipe.cooking_time,
      ...(recipe.key &&{key:recipe.key})
    }
}
export const loadRecipe = async function(id){
  try {
    //
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`)
    
    state.recipe =  createObject(data);
    if(state.bookmarks.some(bookmark=>bookmark.id===id)) state.recipe.bookmarked = true ;
    else state.recipe.bookmarked = false ;
  } catch (error) {
    throw  error ;
  }
}

export const getSearch = async function(query){
  try{
    state.search.query =query ;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
     state.search.results = data.data.recipes.map(recipe=>{
       return{
         id:recipe.id , 
        title: recipe.title,
        publisher : recipe.publisher,
        image : recipe.image_url,
      ...(recipe.key &&{key:recipe.key})
       }
     });    
  } catch (error) {
    throw  error ;
  }
}

export const getPageResults=function(page = state.search.page){
  state.search.page = page ;
  const start = (page-1)* state.search.perPage;
  const end = page * state.search.perPage;

  return state.search.results.slice(start,end);

}

export const updateServings = function(newServings){
  state.recipe.ingredients.forEach(ing=>{
    ing.quantity *= newServings/state.recipe.servings ;
  })
  state.recipe.servings = newServings ;
}

export const addBookmark = function(recipe){

  //add to bookmarks
  state.bookmarks.push(recipe);
  storeBookmarks();
  state.recipe.bookmarked =true ;
}

export const removeBookmark = function(id){
  const index = state.bookmarks.findIndex(bookmark=>bookmark.id===id);
  state.bookmarks.splice(index,1);
  storeBookmarks();

  state.recipe.bookmarked =false ;
}
// getSearch('pizza');

const storeBookmarks=function(){
  localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks))
}

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if(!storage) return ; 
  state.bookmarks = JSON.parse(storage);
}

const resetBookmark = function(){
  localStorage.removeItem('bookmarks');
}

export const uploadRecipe = async function(recipe){

  try {
    const ingredients = Object.entries(recipe)
      .filter(ele=>(ele[0].startsWith('ingredient')&&ele[1] !==""))
      .map(ele=>{
        const  ingredient = ele[1].split(',').map(ele =>ele.trim());
        if(ingredient.length < 3) throw new Error('invalid Format');

        const [quantity ,unit ,description] = ingredient ;
        return {unit ,description,quantity:quantity!==""?+quantity:null }
      });

      const data = {
        title : recipe.title,
        publisher : recipe.publisher,
         image_url: recipe.image,
        ingredients : ingredients,
        servings : +recipe.servings,
         source_url:recipe.sourceUrl,
         cooking_time: +recipe.cookingTime,        
      }

      const res =await AJAX(`${API_URL}?key=${KEY}` ,data);

      state.recipe =  createObject(res);
      addBookmark(state.recipe);
      
  } catch (error) {
    throw error ;
  }


}
// resetBookmark();
init();