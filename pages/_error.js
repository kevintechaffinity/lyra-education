import ErrorContainer from '../components/ErrorContainer';

function Error({ statusCode }) {
  return <ErrorContainer statusCode={statusCode} />;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
