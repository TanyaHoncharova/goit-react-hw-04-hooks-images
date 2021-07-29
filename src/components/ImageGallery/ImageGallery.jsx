import React from 'react';
import PropTypes from 'prop-types';

import  style  from './ImageGallery.module.css';



const ImageGallery = ({ children }) => (
  <ul className={style.ImageGallery}>{children}</ul>
);

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ImageGallery;