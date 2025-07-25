import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className='not-found-container'>
      <h1 className='title'>404</h1>
      <p className='message'>Oops! the page you're looking for does not exit</p>
      <Link to='/' className='link'>
        ← Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
