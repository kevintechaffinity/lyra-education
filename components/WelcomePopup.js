import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import ServiceContext from '../context/ServiceContext';
import styles from '../styles/components/Welcome.module.sass';

import Image from './Image';
import Overlay from './Overlay';

export default function WelcomePopup({ hide }) {
  const router = useRouter();
  const [show, setShow] = useState(true);
  const { loginUrl, loggedIn, assets, primaryColor, callToAction, name, metadata } =
    useContext(ServiceContext);

  const changeRoute = () => {
    router.push('/', '/', { shallow: true });
  };

  const handleClick = () => {
    if (!loggedIn) {
      window.location.href = loginUrl;
      return;
    }

    changeRoute();
  };

  const handleClose = () => {
    document.body.classList.remove('noscroll');
    setShow(false);
    hide();
  };

  return (
    <Overlay show={show} clickBehaviour={handleClose}>
      <div
        className={`${styles.welcome} ${show ? styles.welcome__active : styles.welcome__inactive}`}
      >
        <div className={styles.welcome__banner}>
          <div className={styles.welcome__image_container}>
            <Image publicId={assets.banner} className={styles.welcome__image} />
          </div>
        </div>
        <div className={styles.welcome__details}>
          <span className={styles.welcome__title}>
            Welcome to<span>{name}</span>
          </span>
          <p
            dangerouslySetInnerHTML={{ __html: metadata.descriptionOther }}
            className={styles.welcome__description}
          />
          <a
            className={`button ${styles.welcome__button}`}
            style={{ backgroundColor: `rgb(${primaryColor})` }}
            onClick={() => handleClick()}
          >
            <div className="button__details">
              <span className="button__label">{loggedIn ? callToAction : 'Login Now'}</span>
            </div>
            <span className="button__campaign">Start your journey today</span>
          </a>
          <a className={styles.welcome__close} onClick={changeRoute}>
            Close
          </a>
        </div>
      </div>
    </Overlay>
  );
}
