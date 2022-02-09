import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import Card from './Card';
import styles from './ErrorModal.module.css';

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose} />;
};

const Overlay = (props) => {
  return (
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={styles.content}>
        <p>{props.message}</p>
      </div>
      <footer className={styles.actions}>
        <Button onClick={props.onClose}>Okay</Button>
      </footer>
    </Card>
  );
};

const ErrorModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <Overlay
          onClose={props.onClose}
          title={props.title}
          message={props.message}
        />,
        document.getElementById('overlay-root')
      )}
    </>
  );
};

export default ErrorModal;
