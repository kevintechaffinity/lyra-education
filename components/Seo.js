import Head from 'next/head';
import PropTypes from 'prop-types';

export default function Seo({ title, name, description, domainName, logo, primaryColor, banner }) {
  return (
    <Head lang="en">
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="all" />
      <meta name="robots" content="index,follow" />
      <meta property="og:url" content={domainName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={logo} />
      <meta property="og:type" content="video" />
      <meta name="theme-color" content={`rgb(${primaryColor})`} />
      <link
        id="manifest"
        rel="manifest"
        href={`/local-api/manifest?name=${name}&description=${description}&color=${primaryColor}&url=${domainName}&banner=${banner}`}
      />
      <link rel="icon" type="image/png" sizes="32x32" href={`${domainName}/favicon-32x32.png`} />
      <link rel="icon" type="image/png" sizes="96x96" href={`${domainName}/favicon-96x96.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`${domainName}/favicon-16x16.png`} />
      <style>
        {`
          :root {
            --primary-color: rgb(${primaryColor});
            --secondary-color: rgba(${primaryColor}, 0.85);
          }
        `}
      </style>
    </Head>
  );
}

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  domainName: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  banner: PropTypes.string.isRequired,
};
