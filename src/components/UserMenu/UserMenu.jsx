import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import s from './UserMenu.module.css';

const UserMenu = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    return (
        <div className={s.wrap}>
            <h2 className={s.title}>Welcome, {user.name}</h2>
            <button
                className={s.btn} type="button"
                onClick={() => dispatch(logOut())}>
                Logout
            </button>
        </div>
    )

};

export default UserMenu;