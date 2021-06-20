import Navbar from './navbar';

const Layout = props => {
  return (
    <div className='pageContainer'>
      <Navbar />
      <div>{props?.children}</div>
    </div>
  );
};

export default Layout;
