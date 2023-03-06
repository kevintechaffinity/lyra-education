import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import useIdleTimer from '../hooks/useIdleTimer';
import useRelated from '../hooks/useRelated';
import styles from '../styles/components/Related.module.sass';

import Image from './Image';
import Overlay from './Overlay';

export default function IdlePopup({ hide, allowPopup }) {
  const [show, setShow] = useState(false);
  const [related, setRelated] = useState(undefined);
  const { data } = useRelated();
  const router = useRouter();

  useEffect(() => {
    if (!data) return;
    setRelated(data[Math.floor(Math.random() * data.length)]);
  }, [data]);

  const handleClose = () => {
    document.body.classList.remove('noscroll');
    setShow(false);
    hide();
  };

  const handleShow = () => {
    if (!allowPopup) return;
    document.body.classList.add('noscroll');
    setShow(true);
  };

  const { isIdle } = useIdleTimer({ onIdle: handleShow, idleTime: 5000 });

  if (!related) return null;

  return isIdle ? (
    <Overlay show={show} clickBehaviour={handleClose}>
      <div
        className={`${styles.related} ${show ? styles.related__active : styles.related__inactive}`}
      >
        <div className={styles.related__banner}>
          <div className={styles.related__image_container}>
            <Image
              width="400px"
              height="150px"
              objectPosition="top"
              layout="responsive"
              publicId={related.assets.banner}
              className={styles.related__image}
              alt={related.campaign}
            />
          </div>
        </div>
        <div className={styles.related__details}>
          <span className={styles.related__title}>
            Lets try<span>{related.name}</span>
          </span>
          <p
            dangerouslySetInnerHTML={{ __html: related.metadata.description }}
            className={styles.related__description}
          />
          <a
            className={`button ${styles.related__button}`}
            style={{ backgroundColor: `rgb(${related.primaryColor})` }}
            href={related.domainName}
          >
            <div className="button__details">
              <span className="button__label">{related.callToAction}</span>
            </div>
            <span className="button__campaign">{related.campaign}</span>
          </a>
          <a
            className={styles.related__close}
            style={{ color: `rgb(${related.primaryColor})` }}
            onClick={() => router.push('/', '/', { shallow: true })}
          >
            Close
          </a>
        </div>
      </div>
    </Overlay>
  ) : null;
}

IdlePopup.defaultProps = {
  allowPopup: false,
};

IdlePopup.propTypes = {
  hide: PropTypes.func.isRequired,
  allowPopup: PropTypes.bool,
};
