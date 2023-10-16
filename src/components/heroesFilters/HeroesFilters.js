import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import classNames from 'classnames';
import { filtersSetActive, fetchFilters, selectAll } from './fitersSlice';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const filters = useSelector(selectAll);
    const activeFilter = useSelector(state => state.filters.activeFilter);
    const filtersLoadingStatus = useSelector(state => state.filters.filtersLoadingStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());

        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <h5 className="text-center">Loading...</h5>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center">Ошибка загрузки</h5>
    }

    const renderFilters = (filters) => {
        if (filters.length === 0) {
            return <h5 className="text-center">Фильтры не найдены</h5>;
        }

        return filters.map(({ name, title, className }) => {
            const btnClass = classNames(`btn ${className}`, { 'active': name === activeFilter })
            return (
                <button key={name} onClick={() => dispatch(filtersSetActive(name))} className={btnClass} value={name}>{title}</button>
            )
        })
    }

    const element = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {element}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;