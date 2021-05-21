
const apiKey = '21697918-6e31458764a1a6acf0f5f3f6d';

export default class ApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1
    }
    
    fetchImages() {
        // console.log(this)
        
        const url =`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=`

        return fetch(`${url}${apiKey}`)
            .then(response => response.json())
            .then(data => {
                this.incrementPage()

                return data.hits;
            });
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
