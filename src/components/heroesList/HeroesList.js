import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AnimatePresence } from "framer-motion";

import { useGetHeroesQuery, useDeleteHeroMutation } from "../../api/heroesApi";
import { heroSetActive } from "../../slices/activeSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

import "./heroesList.scss";

const HeroesList = () => {
  const { data: heroes = [], isLoading, isError } = useGetHeroesQuery();

  const [deleteHero] = useDeleteHeroMutation();
  const activeFilter = useSelector((state) => state.active.activeFilter);
  const activeHero = useSelector((state) => state.active.activeHero);
  const dispatch = useDispatch();

  console.log(activeHero);

  const filteredHeroes = useMemo(() => {
    const filteredHeroes = heroes.slice();

    if (activeFilter === "all") {
      return filteredHeroes;
    } else {
      return filteredHeroes.filter((item) => item.element === activeFilter);
    }
  }, [heroes, activeFilter]);

  const heroDel = useCallback((id) => {
    deleteHero(id);
    // eslint-disable-next-line
  }, []);

  const heroUpd = useCallback((id) => {
    dispatch(heroSetActive(id));
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    return <h5 className="text-center mt-5">Loading error</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">No heroes yet</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return (
        <HeroesListItem
          key={id}
          {...props}
          heroUpd={() => heroUpd(id)}
          heroDel={() => heroDel(id)}
          update={id === activeHero}
        />
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);

  // const elements = renderHeroesList(activeFilter === 'all'
  //     ? heroes
  //     : heroes.filter(item => item.element === activeFilter));
  return (
    <ul>
      <AnimatePresence>{elements}</AnimatePresence>
    </ul>
  );
};

export default HeroesList;
