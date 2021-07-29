import React from 'react';
import PropTypes from 'prop-types';
import style  from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ alt, src, url, onClick }) => (
  
  <li className={style.ImageGalleryItem}>
    <img
      onClick={onClick}
      src={src}
      alt={alt}
      className={style.ImageGalleryItemImage}
      url={url}
    />
  </li>
);
ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
