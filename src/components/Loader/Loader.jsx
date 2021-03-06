import { ImSpinner } from 'react-icons/im';
import pendingImage from '../../services/pandingImg.png';
// import { useState } from 'react';


const styles = {
  spinner: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
};


 function LoadingImg({ searchQuery }) {
    const card = {
        src: pendingImage,
        alt: ' ',
        url: ' ',
  
  };

  return (
    <div role="alert">
      <div style={styles.spinner}>
        <ImSpinner size="32" className="icon-spin" />
        Загружаем...{searchQuery}
      </div>
          <img src={card.src}
              alt={card.alt}
           url={card.url}   
          />
    </div>
  );
};

export default LoadingImg;