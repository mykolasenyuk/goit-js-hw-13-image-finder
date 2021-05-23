
import axios from 'axios'

const API_KEY = '21697918-6e31458764a1a6acf0f5f3f6d';
const BASE_URL = 'https://pixabay.com/api';


export default class ApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1
    }
    
    async fetchImages() {
     
     const response =await axios.get(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`)     
      this.incrementPage()
      return response.data.hits
           
    }

  get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery  
    }

    incrementPage() {
       this.page+=1  
    }
    resetPage() {
        this.page=1
    }

}
