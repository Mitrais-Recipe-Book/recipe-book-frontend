import Link from 'next/link';

const Custom404 = (props:any) => {
  return (
    <div
      style={{
        marginTop: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>404</h1>
      <h2>
        <Link href="/">
          <a style={{ color: 'blue', textDecoration: 'underline' }}>
            Go To Home Page
          </a>
        </Link>
      </h2>
      <p>Sorry, the content you are looking for cuould not be found.</p>
    </div>
  );
};

export default Custom404;