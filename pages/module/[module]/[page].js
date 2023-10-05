import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Remarkable } from 'remarkable';

import ContentAudio from '../../../components/ContentAudio';
import ContentContainer from '../../../components/ContentContainer';
import ContentContainerSummary from '../../../components/ContentContainerSummary';
import ContentImage from '../../../components/ContentImage';
import ContentVideo from '../../../components/ContentVideo';
import Grid from '../../../components/Grid';
import PageHeader from '../../../components/headers/PageHeader';
import Hero from '../../../components/Hero';
import Progress from '../../../components/Progress';
import Steps from '../../../components/Steps';
import useService from '../../../hooks/useService';
import useSubscribed from '../../../hooks/useSubscribed';
import { getModule, getPage } from '../../../services/Content';

export default function Page() {
  const router = useRouter();
  const [page, setPage] = useState({});
  const [module, setModule] = useState({});

  const { subscriptionStatus } = useSubscribed();
  const { service } = useService();

  useEffect(() => {
    if (!service) return;

    if (!subscriptionStatus.subscribed.hasAccess && service.metadata.subscribe) {
      if (!router.query.preview) {
        router.push('/billing')
      }
    }
  }, [service, router.query, subscriptionStatus]);

  useEffect(() => {
    getPage(router.query.page, router.query.preview).then((data) => {
      setPage(data);
    });

    getModule(router.query.module).then((data) => {
      setModule(data);
    });
  }, [router.query]);

  const md = new Remarkable();

  md.set({
    html: true,
    breaks: true,
  });

  if (!module) return null;
  if (!service) return null;
  if (!page) return null;

  return (
    <>
      {service.assets && <Hero banner={service.assets.banner} />}
      <Grid>
        <PageHeader item={page} module={module} />
        <ContentContainer>
          <span dangerouslySetInnerHTML={{ __html: md.render(page.introduction) }} />
          {page.assets && page.assets.audio && (
            <ContentAudio publicId={page.assets.audio} name={page.name} />
          )}
          {page.assets && page.assets.video && (
            <ContentVideo publicId={page.assets.video} poster={page.assets.image} />
          )}
          {page.assets && !page.assets.video && page.assets.image && (
            <ContentImage publicId={page.assets.image} />
          )}
          <span dangerouslySetInnerHTML={{ __html: md.render(page.description) }} />
          {page.summary && <ContentContainerSummary summary={page.summary} />}
        </ContentContainer>
        <Steps page={page} />
        {page.progress && <Progress progress={page.progress} />}
      </Grid>
    </>
  );
}
