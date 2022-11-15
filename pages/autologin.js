import React, { Component } from 'react';
import Router from 'next/router';

import Loading from '../components/Loading';

export default class AutoLogin extends Component {
  constructor(props) {
    super(props);
    this.waitForAppMounted = this.waitForAppMounted.bind(this);
  }

  componentDidMount() {
    window.document.body.classList.add('loading');
    this.waitForAppMounted().then(() => {
      const { t, welcome } = Router.query;
      const { login } = this.props;
      login(t, welcome);
    });
  }

  componentWillUnmount() {
    window.document.body.classList.remove('loading');
  }

  waitForAppMounted() {
    return new Promise((resolve) => {
      const loop = setInterval(() => {
        const { appMounted } = this.props;
        if (!appMounted) return;
        clearInterval(loop);
        resolve();
      }, 10);
    });
  }

  render() {
    return <Loading page />;
  }
}

AutoLogin.getInitialProps = async (context) => ({ t: context.query.t });
