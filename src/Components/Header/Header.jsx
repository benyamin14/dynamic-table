import React from 'react'
import './Header.css'
import { BiRefresh } from "react-icons/bi";


function Header() {
    return (
        <header>
            <p className='menu__title'>تعریف دوره‌ها</p>
            <div className='menu__buttons'>
                <button>ثبت اطلاعات جدید<span>+</span></button>
                <div className='menu__icon'><BiRefresh/></div>
            </div>
        </header>
    )
}

export default Header