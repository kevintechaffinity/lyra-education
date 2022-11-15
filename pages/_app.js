import React from 'react';
import cloudinary from 'cloudinary-core';
import { AnimatePresence, motion } from 'framer-motion';
import cookie from 'js-cookie';
import App from 'next/app';
import Router from 'next/router';
import { GoogleAnalytics } from 'nextjs-google-analytics';

import '../styles/styles.sass';

import IdlePopup from '../components/IdlePopup';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import WelcomePopup from '../components/WelcomePopup';
import ServiceContext from '../context/ServiceContext';
import { getModules } from '../services/http/Content';
import { getCompleted, getSite, getSubscriptionStatus } from '../services/http/Service';

Router.events.on('routeChangeComplete', () => {
  window.scrollTo(0, 0);
});

const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: 'dzabdxdw5' });

export default class MyApp extends App {
  constructor(props) {
    super(props);

    this.state = props.site
      ? {
          appMounted: false,
          subscribed: true,
          progress: false,
          loggedIn: !!cookie.get('token'),
          assets: props.site.assets,
          name: props.site.name,
          fee: props.site.fee,
          subscribeUrl: props.site.subscribeUrl,
          unsubscribeUrl: props.site.unsubscribeUrl,
          loginUrl: props.site.loginUrl,
          primaryColor: props.site.primaryColor,
          domainName: props.site.domainName,
          heading: props.site.metadata.heading,
          metadata: props.site.metadata,
          title: props.site.metadata.title,
          logo: props.site.assets.hero,
          campaign: props.site.campaign,
          callToAction: props.site.callToAction,
          completedToday: false,
          showPopup: false,
          showWelcome: false,
        }
      : {
          subscribed: false,
          assets: {},
          metadata: {},
          fee: {},
        };
  }

  componentDidMount() {
    const loggedIn = !!cookie.get('token');

    if (Router.query.welcome) {
      this.setState({ showWelcome: true });
    }

    getModules().then((data) => {
      const progress = data.filter((o) => ['COMPLETED', 'ACTIVE'].includes(o.status)).length > 0;
      this.setState({ progress });
    });

    getSite().then((data) => {
      const {
        name,
        fee,
        assets,
        subscribeUrl,
        loginUrl,
        subscribed,
        primaryColor,
        unsubscribeUrl,
        domainName,
        metadata,
        campaign,
      } = data;

      const { hasAccess } = subscribed || {};

      this.setState({
        appMounted: true,
        subscribed: hasAccess,
        name,
        assets,
        fee,
        subscribeUrl,
        unsubscribeUrl,
        loginUrl,
        loggedIn,
        primaryColor,
        heading: metadata.heading,
        domainName,
        metadata,
        campaign,
        title: metadata.title,
      });
    });

    setInterval(async () => {
      getCompleted().then((data) => {
        this.setState({ completedToday: data.completedToday });
      });
    }, 2000);

    setInterval(async () => {
      this.setState({ loggedIn: !!cookie.get('token') });

      if (!loggedIn) {
        return;
      }
      const { subscribed } = await getSubscriptionStatus();

      if (!subscribed && this.state.metadata.subscribe) {
        this.setState({ subscribed: false });
        return;
      }
      const { hasAccess } = subscribed;

      this.setState({ subscribed: hasAccess });
    }, 5000);
  }

  render() {
    const { Component, pageProps } = this.props;
    const { metadata, domainName, logo } = this.state;

    const login = (token, welcome) => {
      cookie.set('token', token, { expires: 365 });
      this.setState({
        loggedIn: true,
      });

      getSubscriptionStatus().then(({ subscribed }) => {
        const { hasAccess } = subscribed || { hasAccess: false };
        if (hasAccess) {
          Router.push(welcome ? '/?welcome=true' : '/');
          this.setState({
            subscribed: true,
          });
          return;
        }
        Router.push('/');
      });
    };

    const getFee = () => {
      const { currency, rate, period } = this.state.fee;
      if (!rate) {
        return undefined;
      }
      return `${currency}${rate}/${period}`;
    };

    const hidePopup = () => this.setState({ allowPopup: false, showWelcome: false });
    const allowPopup = () => this.setState({ allowPopup: true });
    const title = this.state.title ? `${this.state.title} - ${this.state.heading}` : '...';
    const primaryColor = this.state.primaryColor ? this.state.primaryColor : 'transparent';

    return (
      <ServiceContext.Provider
        value={{
          name: this.state.name,
          title: this.state.title,
          subscribed: this.state.subscribed,
          subscribeUrl: this.state.subscribeUrl,
          unsubscribeUrl: this.state.unsubscribeUrl,
          loggedIn: this.state.loggedIn,
          assets: this.state.assets,
          fee: getFee(),
          loginUrl: this.state.loginUrl,
          host: this.state.host,
          heading: this.state.heading,
          description: metadata.description,
          descriptionOther: metadata.descriptionOther,
          domainName,
          campaign: this.state.campaign,
          callToAction: this.state.callToAction,
          completedToday: this.state.completedToday,
          metadata: this.state.metadata,
          progress: this.state.progress,
        }}
      >
        <Seo
          title={title}
          description={metadata.description}
          domainName={domainName}
          logo={cloudinaryCore.url(logo)}
          primaryColor={primaryColor}
        />
        <AnimatePresence exitBeforeEnter>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Layout>
              <GoogleAnalytics gaMeasurementId={metadata.googleAnalytics} trackPageViews />
              <Component
                {...pageProps}
                appMounted={this.state.appMounted}
                login={login}
                allowPopup={allowPopup}
              />
            </Layout>
          </motion.div>
        </AnimatePresence>

        {this.state.showWelcome ? (
          <WelcomePopup hide={hidePopup} />
        ) : (
          <IdlePopup allowPopup={this.state.allowPopup} hide={hidePopup} />
        )}
      </ServiceContext.Provider>
    );
  }
}

MyApp.getInitialProps = async ({ ctx: { req } }) => {
  const host = req ? req.headers.host : undefined;
  if (!host) return {};
  const site = await getSite(host);

  return { site };
};
