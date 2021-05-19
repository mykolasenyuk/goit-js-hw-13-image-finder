
import imgsTmpl from '../templates/imagesCard.hbs'
import ApiService from './apiService'



const refs = {
    searchInput: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]')

}
const apiService = new ApiService();
console.log(apiService)

refs.searchInput.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click',onLoadMore)



function onSearch(e) {
    e.preventDefault()
    

apiService.query = e.currentTarget.elements.query.value;
    // console.log(searchQery)
    apiService.resetPage()
    apiService.fetchImages().then(hits=>console.log(hits))

};


function onLoadMore(params) {
      
  apiService.fetchImages().then(hits=>console.log(hits))

}

function appendImgsMarkup(hits) {
    refs.
}