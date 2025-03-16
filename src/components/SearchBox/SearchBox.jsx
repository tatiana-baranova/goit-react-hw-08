import { TbUserSearch } from "react-icons/tb";
import s from './SearchBox.module.css'
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filters.name)
    return (
        <div className={s.info}>
            <p className={s.text}>Find contacts by name</p>
            <div className={s.label}>
            <TbUserSearch size="22"/>
            <input
                className={s.input}
                type="text"
                value={filter}
                onChange={e => dispatch(changeFilter(e.target.value))}
            />
            </div>
        </div>
    )
}

export default SearchBox;