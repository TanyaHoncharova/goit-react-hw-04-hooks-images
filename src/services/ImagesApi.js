import axios from 'axios';

const KEY = '21857755-e4f1c8434e57799dc3fa1e51f';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const  fetchImages= async({searchQuery =' ', currentPage =1 }) => {
  
  return axios
    .get(
      `?q=${searchQuery}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);
};



const api = {
    fetchImages,

};

export default api;
