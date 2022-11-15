import React, { useContext } from 'react';

import ServiceContext from '../context/ServiceContext';
import styles from '../styles/components/Header.module.sass';

import GhostButton from './GhostButton';
import Grid from './Grid';
import Logo from './Logo';

export default function Header() {
  const { loggedIn, loginUrl, subscribed, progress } = useContext(ServiceContext);

  return (
    <Grid>
      <header className={styles.header}>
        <Logo />
        <div className={styles.header__column}>
          {loggedIn && subscribed && progress && (
            <GhostButton href="/progress" badge>
              Your Progress
            </GhostButton>
          )}
          {!loggedIn && <GhostButton href={loginUrl}>Login</GhostButton>}
        </div>
      </header>
    </Grid>
  );
}
