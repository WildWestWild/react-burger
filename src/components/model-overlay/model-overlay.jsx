import React from 'react';
import styles from './model-overlay.module.css';

const ModalOverlay = ({ onClick }) => {
  return <div className={styles.overlay} onClick={onClick}></div>;
};

export default ModalOverlay;
