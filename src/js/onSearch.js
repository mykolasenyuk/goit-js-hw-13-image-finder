
import imgsTmpl from '../templates/imagesCard.hbs'
import ApiService from './apiService'



const refs = {
    searchInput: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    imgsList: document.querySelector('.gallery')

}
const apiService = new ApiService();
console.log(apiService)

refs.searchInput.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click',onLoadMore)




function onSearch(e) {
    e.preventDefault()
    

    apiService.query = e.currentTarget.elements.query.value;

    //  забороняє пошук на пустий Input чи на пробіл 
    // if (e.currentTarget.elements.query.value[0] === ' '
    //     || e.currentTarget.elements.query.value === '') {
      
    //    return alert('ha-ha')
    // }


    
    apiService.resetPage()
    apiService.fetchImages().then(hits => {
        clearImgsMarkup();
        appendImgsMarkup(hits)
    })

};


function onLoadMore() {
      
  apiService.fetchImages().then(appendImgsMarkup)

}

function appendImgsMarkup(hits) {
    refs.imgsList.insertAdjacentHTML('beforeend',imgsTmpl(hits))
}
function clearImgsMarkup() {
    refs.imgsList.innerHTML = '';
    
}