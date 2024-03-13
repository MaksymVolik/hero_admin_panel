import HeroesList from "../heroesList/HeroesList";
import HeroesAddForm from "../heroesAddForm/HeroesAddForm";
import HeroesFilters from "../heroesFilters/HeroesFilters";

const HomePage = () => {
  return (
    <main className="app">
      <div className="content homepage">
        <HeroesList />
        <div className="content__interactive">
          <HeroesAddForm />
          <HeroesFilters />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
