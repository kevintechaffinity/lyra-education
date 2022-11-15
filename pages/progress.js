import React, { Component } from 'react';

import CardContainer from '../components/CardContainer';
import Grid from '../components/Grid';
import StaticHeader from '../components/headers/StaticHeader';
import StaticBanner from '../components/StaticBanner';
import { getModules } from '../services/http/Content';

export default class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: [],
    };
  }

  componentDidMount() {
    getModules().then((data) => {
      this.setState({ modules: data.filter((o) => ['COMPLETED', 'ACTIVE'].includes(o.status)) });
    });
  }

  render() {
    const { modules } = this.state;

    return (
      <>
        <StaticBanner />
        <Grid>
          <StaticHeader title="Your Progress">
            View or review your completed course material below:
          </StaticHeader>
          <CardContainer items={modules} />
        </Grid>
      </>
    );
  }
}
