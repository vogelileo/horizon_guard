import Ristl43Logo from '../assets/FUB_Ristl_Bat_4_3.svg';

const Header = () => {
  return (
    <div
      className='bcol-ibm-black d-f f-ja f-ac pl-1 pr-1 pt-2 pb-2 '
      style={{ height: '80px' }}
    >
      <img className='img-h' src={Ristl43Logo} />
      <h1 className='m-0 col-fff text-align-center'>HORIZON GUARD</h1>
      <img className='img-h' src={Ristl43Logo} />
    </div>
  );
};

export default Header;
