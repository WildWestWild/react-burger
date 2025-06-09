import { FC, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './model.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../model-overlay/model-overlay';

const modalRoot = document.getElementById('modal-root');

type ModalProps = {
  title?: string;
  children: ReactNode;
  onClose: () => void;
};

const Modal: FC<ModalProps> = ({ title, children, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={styles.modal}>
        <div className={title ? styles.headerBetween : styles.headerEnd}>
          {title && (
            <h2 className="text text_type_main-large">{title}</h2>
          )}
          <button className={styles.close} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
