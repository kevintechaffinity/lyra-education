import React, { Component } from 'react';
import { Remarkable } from 'remarkable';

import ContentContainer from '../components/ContentContainer';
import Grid from '../components/Grid';
import StaticHeader from '../components/headers/StaticHeader';
import StaticBanner from '../components/StaticBanner';
import ServiceContext from '../context/ServiceContext';
import { getTermsConditions } from '../services/http/Service';

export default class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null,
    };
  }

  componentDidMount() {
    getTermsConditions().then((data) => {
      this.setState({ page: data.body });
    });
  }

  render() {
    const { title, domainName } = this.context;
    const { page } = this.state;
    const md = new Remarkable();

    md.set({
      html: true,
      breaks: true,
    });

    return (
      <>
        <StaticBanner />
        <Grid>
          <StaticHeader title="Terms & Conditions">{`These are the terms and conditions for <b>${title}</b> (${domainName}) known otherwise as "The service":`}</StaticHeader>
          <ContentContainer>
            <span dangerouslySetInnerHTML={{ __html: md.render(page) }} />
          </ContentContainer>
        </Grid>
      </>
    );
  }
}

TermsAndConditions.contextType = ServiceContext;
