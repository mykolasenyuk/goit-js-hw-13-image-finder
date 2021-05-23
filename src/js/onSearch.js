
import imgsTmpl from '../templates/imagesCard.hbs'
// import ApiService from './apiService';
import ApiService from './asyncApi';
import { error, notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox'



const refs = {
    searchInput: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    imgsList: document.querySelector('.gallery')

}
const apiService = new ApiService();
// console.log(apiService)

refs.searchInput.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click',onLoadMore)




function onSearch(e) {
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
    apiService.fetchImages().then(hits => {
        clearImgsMarkup();
        appendImgsMarkup(hits)
    })

};

//     window.scrollTo({
//   top: window.innerHeight,
//   behavior: 'smooth'
// });
function onLoadMore() {
   
    apiService.fetchImages().then(appendImgsMarkup);

        window.scrollTo({
  top: document.documentElement.scrollHeight,
  behavior: 'smooth'
});

}

function appendImgsMarkup(hits) {
    refs.imgsList.insertAdjacentHTML('beforeend', imgsTmpl(hits))
    

// instance.show()
}

function clearImgsMarkup() {
    refs.imgsList.innerHTML = '';
    
}


// const instance = basicLightbox.create(`
//     <img src="" width="800" height="600">
// `)