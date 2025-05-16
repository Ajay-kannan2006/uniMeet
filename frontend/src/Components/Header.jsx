import Logo from '../assets/unimeet_logo-removebg-preview.png'
import Navbar from './Navbar';
import Profile from '../assets/Profile.jpg'
const Header = ({tab}) => {
    return (
        
        <div className="w-[100vw] h-[100px] flex  justify-center gap-44 items-center" >
            <img src={Logo} />
            <Navbar tab={tab} />
            <img src={Profile}  className="rounded-[20px] h-[65px] w-[65px] bg-[var(--primary-color)]"/>
        </div>
    )
}
export default Header;