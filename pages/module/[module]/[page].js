import React, { Component } from 'react';
import Router from 'next/router';
import { Remarkable } from 'remarkable';

import ContentAudio from '../../../components/ContentAudio';
import ContentContainer from '../../../components/ContentContainer';
import ContentContainerSummary from '../../../components/ContentContainerSummary';
import ContentImage from '../../../components/ContentImage';
import ContentVideo from '../../../components/ContentVideo';
import Grid from '../../../components/Grid';
import PageHeader from '../../../components/headers/PageHeader';
import PageBanner from '../../../components/PageBanner';
import Progress from '../../../components/Progress';
import Steps from '../../../components/Steps';
import ServiceContext from '../../../context/ServiceContext';
import { getModule, getPage } from '../../../services/http/Content';

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {},
      module: {},
    };
    this.waitForAppMounted = this.waitForAppMounted.bind(this);
  }

  componentDidMount() {
    this.waitForAppMounted().then(() => {
      const { module, page, preview } = Router.router.query;
      const { subscribed, subscribeUrl, metadata } = this.context;

      if (!subscribed && metadata.subscribe) {
        if (!preview) {
          window.location.href = subscribeUrl;
          return;
        }
      }

      getModule(module).then((data) => {
        this.setState({ module: data });
      });

      getPage(page, preview).then((data) => {
        this.setState({ page: data });
      });
    });
  }

  waitForAppMounted() {
    return new Promise((resolve) => {
      const loop = setInterval(() => {
        const { appMounted } = this.props;
        if (!appMounted) {
          return;
        }
        clearInterval(loop);
        resolve();
      }, 50);
    });
  }

  render() {
    const { page, module } = this.state;

    const md = new Remarkable();
    md.set({
      html: true,
      breaks: true,
    });

    return (
      <>
        <PageBanner item={page} />
        <Grid>
          <PageHeader item={page} module={module} />
          <ContentContainer>
            <span dangerouslySetInnerHTML={{ __html: md.render(page.introduction) }} />
            {page.assets && page.assets.audio && (
              <ContentAudio publicId={page.assets.audio} name={page.name} />
            )}
            {page.assets && page.assets.video && <ContentVideo publicId={page.assets.video} />}
            {page.assets && page.assets.image && <ContentImage publicId={page.assets.image} />}
            <span dangerouslySetInnerHTML={{ __html: md.render(page.description) }} />
            <ContentContainerSummary summary={page.summary} />
          </ContentContainer>
          <Steps page={page} />
          <Progress progress={page.progress} />
        </Grid>
      </>
    );
  }
}

Page.contextType = ServiceContext;
