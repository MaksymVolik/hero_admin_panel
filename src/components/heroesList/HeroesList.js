import { useCallback, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useHttp } from '../../hooks/http.hook';
import { heroesDelete, fetchHeroes, filteredHeroesSelector } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {
    const filteredHeroes = useSelector(filteredHeroesSelector);
    // const heroes = useSelector(state => state.heroes.heroes);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    // const activeFilter = useSelector(state => state.filters.activeFilter);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);


    const heroesDel = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(() => dispatch(heroesDelete(id)))
            .catch(err => console.log(err))
        // eslint-disable-next-line
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            const nodeRef = createRef(null);
            return (
                <CSSTransition nodeRef={nodeRef} classNames={'card'} timeout={500} >
                    <h5 ref={nodeRef} className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({ id, ...props }) => {
            const nodeRef = createRef(null);
            return (
                <CSSTransition nodeRef={nodeRef} key={id} classNames={'card'} timeout={500} >
                    <HeroesListItem
                        {...props}
                        nodeRef={nodeRef}
                        heroesDel={() => heroesDel(id)}
                    />
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);

    // const elements = renderHeroesList(activeFilter === 'all'
    //     ? heroes
    //     : heroes.filter(item => item.element === activeFilter));
    return (
        <TransitionGroup component={'ul'} >
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;