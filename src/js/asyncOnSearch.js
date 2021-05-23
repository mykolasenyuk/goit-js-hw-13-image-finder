
import imgsTmpl from '../templates/imagesCard.hbs'
// import ApiService from './apiService';
import ApiService from './asyncApi';
import { error, notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox'
import LoadMoreBtn from './loadMoreBtn'



const refs = {
    searchInput: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    imgsList: document.querySelector('.gallery')
}
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true
})
// console.log(loadMoreBtn)
const apiService = new ApiService();
// console.log(apiService)

refs.searchInput.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click',onLoadMore)
// refs.loadMoreBtn.addEventListener('click',onLoadMore)
// loadMoreBtn.show()
// loadMoreBtn.disable()

 async function onSearch(e) {
    e.preventDefault()
     clearImgsMarkup();

    apiService.query = e.currentTarget.elements.query.value;

    //  Forbids search for empty or "Space" in input

    if (e.currentTarget.elements.query.value[0] === ' '
        || e.currentTarget.elements.query.value === '') {
       return   notice({
           text: 'Please,enter valid name'
       })   
     }

     apiService.resetPage()
      

     const result = await apiService.fetchImages(apiService.searchQuery)
    
     if (result.length === 0) {
         
         error({
             text: `'${apiService.searchQuery}' not found!
            Please enter valid name`
              
         });
         loadMoreBtn.hide()
     }
     else {
         loadMoreBtn.show()
         loadMoreBtn.disable()
     }
     try {
        
         clearImgsMarkup();
         appendImgsMarkup(result);
         loadMoreBtn.enable()
          window.scrollTo({
  top: 150,
  behavior: 'smooth'
});   
     } catch (error) {
         notice({
           text: 'Please,enter valid name'
       })     
}
};


async function onLoadMore() {
    loadMoreBtn.disable();
    const result = await apiService.fetchImages(apiService.searchQuery);
try {
    appendImgsMarkup(result);
    loadMoreBtn.enable();
    
} catch (error) {
    notice({
        text: 'Please,enter valid name'
    })
}
};

function appendImgsMarkup(hits) {
    refs.imgsList.insertAdjacentHTML('beforeend', imgsTmpl(hits))
};

function clearImgsMarkup() {
    refs.imgsList.innerHTML = '';  
};


// const instance = basicLightbox.create(`
//     <img src="" width="800" height="600">
// `)