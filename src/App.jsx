import React, { useEffect, useState } from 'react';
// import { ToastContainer } from 'react-toastify';
import Api from './services/ImagesApi';

import Modal from './components/Modal';
import Button from './components/Button';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Loader from './components/Loader'
import './App.css';

const App = () => {
  const [images, setImages] = useState('');
  const [currentPage, setCurrentPage] = useState('1');
  const [currentPageImages, setCurrentPageImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  // useEffect(() => {
  //   fetchImages()
  // }, [searchQuery]);

  useEffect(() => {
    scrollWindow()
  }, [currentPage]);
  
  const toggleModal = () => {
    setShowModal(!showModal)
  };

  const handleFormSubmit = (searchQuery) => {
    setSearchQuery(searchQuery);
    setCurrentPage(1);
    setImages([]);
    setError(null);
  };

  useEffect(() => {
    if (searchQuery) {
      searchImagesFetch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const searchImagesFetch = () => {
    setIsLoading(true);
    Api.fetchImage(searchQuery, currentPageImages)
      .then((imagesArr) => {
        if (currentPageImages === 1) {
          setImages(imagesArr.hits)
        } else {
          setImages((prevState) => [...prevState, ...imagesArr.hits]);
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch((error) => setError(error))
      .finally(() =>{
        setIsLoading(false);
        setCurrentPageImages((prevPage) => prevPage + 1);
      });
  };
  
  const onClickImageGalleryItem = (e) => {
    setModalUrl(e.currentTarget.getAttribute('url'));
    setModalAlt(e.currentTarget.getAttribute('alt'));
    toggleModal();
  };

  const scrollWindow = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const shouldRenderLoadMoreButton = !(currentPageImages.length < 12) && !isLoading;

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && (
        <p> something went wrong ... {error} </p>
      )}
      <ImageGallery>
        { images && images.map(({ id, tags, webformatURL, largeImageURL }) => (
          <ImageGalleryItem key={id} alt={tags} src={webformatURL} url={largeImageURL} onClick={onClickImageGalleryItem} />
        ))}
      </ImageGallery>
      {isLoading && <Loader name={searchQuery} />}
        
      {shouldRenderLoadMoreButton &&
        <Button onClick={searchImagesFetch} />}
        

      {showModal &&
        (<Modal onClose={toggleModal}
          src={modalUrl} alt={modalAlt}>
          <button type="button" onClick={toggleModal}>
            Close
          </button>
        </Modal>)}
    </>
  )
};



export default App;
