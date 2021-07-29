import React, { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
import ImagesApi from './services/ImagesApi';

import Modal from './components/Modal';
import Button from './components/Button';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Loader from './components/Loader'
import './App.css';




class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    currentPageImages: [],
    searchQuery: '',
    isLoading: false,
    error: null,
    largeImage: '',
    showModal: false,
    modalUrl: '',
    modalAlt: '',
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
    if (prevState.currentPage > 2) {
      this.scrollWindow();
    }
  }
  
  toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal
    }))
  }

  handleFormSubmit = (searchQuery) => {
    this.setState({
      searchQuery: searchQuery,
      currentPage: 1, 
      images: [], 
      error: null, 
    });
  };

  fetchImages = () => {
    const { searchQuery, currentPage } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ loading: true });

    ImagesApi.fetchImages(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
          currentPageImages: [...images],
        }));
        if (images.length === 0) {
          this.setState({
            error: 'Nothing was find by your query. Try again.',
          });
        }
      })
      .catch(error => this.setState({ error: error.message }))
      .finally(() => {
        
        this.setState({ isLoading: false });
      });
  };

  onClickImageGalleryItem = (e) => {
    this.setState({
      modalUrl: e.currentTarget.getAttribute('url'),
      modalAlt: e.currentTarget.getAttribute('alt'),
    });
    this.toggleModal();
  };

    scrollWindow = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, searchQuery, currentPageImages, isLoading, error, showModal, modalAlt, modalUrl } = this.state;
    const shouldRenderLoadMoreButton = !(currentPageImages.length < 12) && !isLoading;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && (
          <p> something went wrong ... {error } </p>
        )}
        <ImageGallery>
          {images.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem key={id} alt={tags} src={webformatURL} url={largeImageURL} onClick={this.onClickImageGalleryItem} />
          ))}
        </ImageGallery>
        {isLoading && <Loader name={searchQuery}/>}
        
         { shouldRenderLoadMoreButton && 
          <Button onClick={this.fetchImages} />}
        

        {showModal &&
          (<Modal onClose={this.toggleModal}
            src={modalUrl} alt={modalAlt}>
          <button type="button" onClick={this.toggleModal}>
            Close
          </button>
        </Modal>)}
        </>
  )
  }
};

export default App;
