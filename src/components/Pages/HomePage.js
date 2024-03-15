import HeroesList from "../heroesList/HeroesList";
import HeroesAddForm from "../heroesAddForm/HeroesAddForm";
import HeroesFilters from "../heroesFilters/HeroesFilters";

const HomePage = () => {
  return (
    <main className="container mt-5 position-relative">
      <div className="row gx-5 justify-content-center">
        <div className="col-6">
          <HeroesList />
        </div>
        <div className="col-4">
          <HeroesAddForm />
          <HeroesFilters />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
