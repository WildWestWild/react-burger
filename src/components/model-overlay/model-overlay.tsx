import { FC } from 'react';
import styles from './model-overlay.module.css';

type ModalOverlayProps = {
  onClick: () => void;
}

const ModalOverlay: FC<ModalOverlayProps> = ({ onClick }) => {
  return <div className={styles.overlay} onClick={onClick}></div>;
};

export default ModalOverlay;
