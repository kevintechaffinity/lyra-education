import React, { Component } from 'react';
import Idle from 'react-idle';
import Router from 'next/router';

import { getRelated } from '../services/http/Service';
import styles from '../styles/components/Related.module.sass';

import Image from './Image';
import Overlay from './Overlay';

export default class IdlePopup extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false, related: undefined };
  }

  componentDidMount() {
    const { related } = this.state;
    if (related) return;

    getRelated().then((data) => {
      if (!data) return;
      this.setState({ related: data[Math.floor(Math.random() * data.length)] });
    });
  }

  close() {
    const { hide } = this.props;
    document.body.classList.remove('noscroll');
    this.setState({ show: false });
    hide();
  }

  show() {
    const { allowPopup } = this.props;
    if (!allowPopup) return;
    document.body.classList.add('noscroll');
    this.setState({ show: true });
  }

  render() {
    const { related, show } = this.state;
    if (!related) return null;

    return (
      <Overlay show={show} clickBehaviour={this.close.bind(this)}>
        <Idle
          timeout={50000}
          onChange={() => {
            this.show();
          }}
        />
        <div
          className={`${styles.related} ${
            show ? styles.related__active : styles.related__inactive
          }`}
        >
          <div className={styles.related__banner}>
            <div className={styles.related__image_container}>
              <Image publicId={related.assets.banner} className={styles.related__image} />
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
              onClick={() => Router.push('/', '/', { shallow: true })}
            >
              Close
            </a>
          </div>
        </div>
      </Overlay>
    );
  }
}
