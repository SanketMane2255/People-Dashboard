
import { FaRegBell } from "react-icons/fa";
import Profile from '../img/profile.png'


const Navbar = () => {

 

    return (
        <div>
            <nav className="navbar  navbar-light bg-light border-bottom">
                <div className="container-md">
                    <div className="navbar-brand fw-bold fs-2" style={{ color: '#6941C6' }}>
                        PEOPLE.CO
                    </div>
                    <div className="d-flex flex-row align-items-center">
                        <FaRegBell size={24} style={{ marginRight: '1rem' }} />
                        <img src={Profile} alt="Profile" />
                        <div className="pt-1 ms-2" style={{ fontWeight: '600' }}>
                            Jone Doe
                        </div>
                    </div>
                </div>
            </nav>

           
        </div>
    )
}

export default Navbar