import React from 'react'
import imga from '../img/black.png'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {

    const location = useLocation();
    const activePath = location.pathname;

    return (
        <div className='d-flex flex-column py-3' style={{ height: "100vh", width: "100%" }}>
            <div className='d-flex flex-row align-items-center py-2'>
                <img src={imga} alt='Overview' className='ms-3 me-2' style={{ height: "1.4rem", width: "1.4rem" }} />
                <Link to="/" style={{ textDecoration: "none", fontWeight:"bold",color: activePath === "/" ? "#6941c6" : "inherit" }}>
                    <div>Overview</div>
                </Link>
            </div>
            <div className='d-flex flex-row align-items-center py-2'>
                <img src={imga} alt='people directory' className='ms-3 me-2' style={{ height: "1.4rem", width: "1.4rem" }} />
                <Link to="/directory" style={{ textDecoration: "none",fontWeight:"bold", color: activePath === "/directory" ? "#6941c6" : "inherit" }}>
                    <div>People Directory</div>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar