import React from 'react'
import './Header.css'
import headerImg from '../../images/headerimg.jpg'

const Header = () => {
    return (
        <div>
            <div className="header">
                <div className="header-titles">
                    <span className="header-title-small">React & Node</span>
                    <span className="header-title-large"> Blog</span>
                </div>
                <img src={headerImg} alt="header" className="header-img" />
            </div>
        </div>
    )
}

export default Header
