import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { useGetFiltersQuery } from "../../api/heroesApi";
import { filtersSetActive } from "../../slices/activeSlice";

const HeroesFilters = () => {
  const { data: filters = [], isLoading, isError } = useGetFiltersQuery();
  const activeFilter = useSelector((state) => state.active.activeFilter);

  const dispatch = useDispatch();

  if (isLoading) {
    return <h5 className="text-center">Loading...</h5>;
  } else if (isError === "error") {
    return <h5 className="text-center">Loading error</h5>;
  }

  const renderFilters = (filters) => {
    if (filters.length === 0) {
      return <h5 className="text-center">No filters found</h5>;
    }

    return filters.map(({ name, title, classname }) => {
      const btnClass = classNames(`btn ${classname}`, {
        active: name === activeFilter,
      });
      return (
        <button
          key={name}
          onClick={() => dispatch(filtersSetActive(name))}
          className={btnClass}
          value={name}
        >
          {title}
        </button>
      );
    });
  };

  const element = renderFilters(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Filter heroes by element</p>
        <div className="btn-group">{element}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
