import React from 'react';

import styles from '../styles/components/Card.module.sass';

import Card from './Card';

export default function CardContainer({ items }) {
  return (
    <div className={styles.card__container}>
      {items.map((item, index) => (
        <Card key={index} course={item} index={index} />
      ))}
    </div>
  );
}
