import React from 'react';
import { Remarkable } from 'remarkable';

import ContentContainer from '../components/ContentContainer';
import Grid from '../components/Grid';
import StaticHeader from '../components/headers/StaticHeader';
import Hero from '../components/Hero';
import useService from '../hooks/useService';
import useTermsAndConditions from '../hooks/useTermsAndConditions';

export default function TermsAndConditions() {
  const { page } = useTermsAndConditions();
  const { service } = useService();

  const { metadata, domainName, assets } = service;

  if (!page) return null;
  if (!service) return null;

  const md = new Remarkable();
  md.set({
    html: true,
    breaks: true,
  });

  return (
    <>
      {assets && <Hero banner={assets.banner} />}
      <Grid>
        <StaticHeader title="Terms & Conditions">{`These are the terms and conditions for <b>${metadata.title}</b> (${domainName}) known otherwise as "The service":`}</StaticHeader>
        <ContentContainer>
          <span dangerouslySetInnerHTML={{ __html: md.render(page) }} />
        </ContentContainer>
      </Grid>
    </>
  );
}
