import Navbar from './navbar';

const Layout = props => {
  return (
    <div className='pageContainer'>
      <Navbar />
      <div className='max-w-md mx-auto bg-white overflow-hidden md:max-w-5xl mobile'>
        {props?.children}
      </div>
    </div>
  );
};

export default Layout;
