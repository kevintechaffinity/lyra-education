import React from 'react';
import { getCookie } from 'cookies-next';

import useService from '../hooks/useService';
import useSubscribed from '../hooks/useSubscribed';
import styles from '../styles/components/Header.module.sass';

import GhostButton from './GhostButton';
import Grid from './Grid';
import Logo from './Logo';

export default function Header() {
  const { service } = useService();
  const { subscriptionStatus } = useSubscribed();

  const { loginUrl } = service;

  const loggedIn = !!getCookie('token');

  if (!service) return null;

  return (
    <Grid>
      <header className={styles.header}>
        <Logo />
        <div className={styles.header__column}>
          {loggedIn && true && (
            <GhostButton href="/progress" badge>
              Your Progress
            </GhostButton>
          )}
          {!loggedIn && <GhostButton href={'/signup'}>Join Now</GhostButton>}
        </div>
      </header>
    </Grid>
  );
}
