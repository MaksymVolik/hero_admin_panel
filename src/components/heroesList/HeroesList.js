import { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AnimatePresence } from "framer-motion";

import { useGetHeroesQuery, useDeleteHeroMutation } from "./heroApiSlice";
import { heroActiveReset, heroSetActive } from "../../slices/activeSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
  const {
    data: heroes = [],
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetHeroesQuery();

  const [deleteHero, { isLoading: isLoadingDel }] = useDeleteHeroMutation();
  const activeFilter = useSelector((state) => state.active.activeFilter);
  const activeHero = useSelector((state) => state.active.activeHero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFetching) {
      dispatch(heroActiveReset());
    }
    // eslint-disable-next-line
  }, [isFetching]);

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

  const heroUpd = useCallback((hero) => {
    dispatch(heroSetActive(hero));
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

    return arr.map((hero) => {
      return (
        <HeroesListItem
          key={hero.id}
          {...hero}
          heroUpd={() => heroUpd(hero)}
          heroDel={() => heroDel(hero.id)}
          update={activeHero.id === hero.id}
        />
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);

  return (
    <>
      <ul>
        <AnimatePresence>{elements}</AnimatePresence>
      </ul>
      {isFetching || isLoadingDel ? <Spinner /> : null}
      <button className="btn" onClick={() => refetch()}>
        Reload Heroes
      </button>
    </>
  );
};

export default HeroesList;
