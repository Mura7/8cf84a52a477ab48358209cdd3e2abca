const NavBar = () => {
  return (
    <div className='navbar'>
      <div className='navbarTitleContainer'>
        <div className='navbarTitle'>Otel</div>
        <div className='navbarSubTitle'>Rezervasyon Sistemi</div>
      </div>
      <div>
        <button className='navbarButton'>Yeni Rezervasyon Yap</button>
      </div>
    </div>
  );
};

export default NavBar;
