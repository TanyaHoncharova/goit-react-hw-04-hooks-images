import React, { Component } from 'react';
import { createPortal } from 'react-dom';



import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

    componentDidMount() {
     window.addEventListener('keydown', this.handleKeyDown);
    };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

    handleKeyDown = e => {
    if (e.code === 'Escape') {
    this.props.onClose();
    }
  };
    
    handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
    };

  render() {
       const { src, alt } = this.props;
        return createPortal(
          <div className={styles.Overlay} onClick={this.handleBackdropClick}>
            <div className={styles.Modal__content}>
              <img src={src} alt={alt} />
            </div>
            </div>,
            modalRoot,
        );
    }
}