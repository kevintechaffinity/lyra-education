import React, { Component } from 'react';
import Router from 'next/router';
import { Remarkable } from 'remarkable';

import ContentContainer from '../../components/ContentContainer';
import OutlineContainer from '../../components/course-outline/OutlineContainer';
import Grid from '../../components/Grid';
import ModuleHeader from '../../components/headers/ModuleHeader';
import ModuleBanner from '../../components/ModuleBanner';
import { getModule } from '../../services/http/Content';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      module: [],
      slug: '/',
    };
  }

  componentDidMount() {
    const { module } = Router.router.query;

    getModule(module).then((data) => {
      const { chapters } = data;
      const chapter = chapters.find((o) => o.status !== 'COMPLETED') || {};
      const pages = chapter.pages || [];
      const progress = pages.find((o) => ['PENDING'].includes(o.status));
      const slug = progress ? progress.slug : '';
      this.setState({ module: data, slug });
    });
  }

  render() {
    const { module, slug } = this.state;

    const md = new Remarkable();
    md.set({
      html: true,
      breaks: true,
    });

    return (
      <div>
        <ModuleBanner item={module} />
        <Grid>
          <ModuleHeader item={module} slug={slug} />
          <ContentContainer>
            <span dangerouslySetInnerHTML={{ __html: md.render(module.description) }} />
            <OutlineContainer chapters={module.chapters} slug={slug} />
          </ContentContainer>
        </Grid>
      </div>
    );
  }
}
