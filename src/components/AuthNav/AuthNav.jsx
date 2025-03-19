import { NavLink } from "react-router-dom";
import s from './AuthNav.module.css';
import clsx from "clsx";

const AuthNav = () => {
    const buildLinkClass = ({ isActive }) => {
        return clsx(s.link, isActive && s.active);
    };

    return (
        <div className={s.wrap}>
            <NavLink className={buildLinkClass} to='/register'>
                Register
            </NavLink>
            <NavLink className={buildLinkClass} to='/login'>
                Login
            </NavLink>
        </div>
    )
};

export default AuthNav;