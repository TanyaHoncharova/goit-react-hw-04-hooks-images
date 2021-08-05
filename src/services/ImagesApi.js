
const KEY = '21857755-e4f1c8434e57799dc3fa1e51f';
async function fetchImage(searchQuery, currentPage) {
  const res = await fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(new Error('There is no data'));
}
const api = { fetchImage };

export default api;
