import React, { Component } from 'react';

import Banner from '../components/Banner';
import CardContainer from '../components/CardContainer';
import GhostButton from '../components/GhostButton';
import Grid from '../components/Grid';
import Summary from '../components/Summary';
import { getModules } from '../services/http/Content';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: [],
      limit: 10,
    };
  }

  componentDidMount() {
    const { allowPopup } = this.props;
    allowPopup();

    getModules().then((data) => {
      this.setState({ modules: data });
    });
  }

  render() {
    const { modules, limit } = this.state;

    const handleClick = () => {
      this.setState({ limit: 1000 });
    };

    return (
      <>
        <Banner />
        <Summary items={modules} />
        <Grid>
          <CardContainer items={modules.filter((o) => o.status !== 'COMPLETED').slice(0, limit)} />
          {modules.length <= limit ? (
            ''
          ) : (
            <GhostButton onClick={handleClick}>Browse more</GhostButton>
          )}
        </Grid>
      </>
    );
  }
}
