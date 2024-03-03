import { useEffect, useState } from "react";
import { RecipeType, getRecipe, getRecipes } from "../../utils/recipe-utils";

import recipe_img from "../../resources/mock/recipe.jpg";

const RecipeCard = (props: RecipeType) => {
  const { title, tags } = props;
  return (
    <a
      className="card card-compact shadow-md w-5/6 sm:w-full"
      href="."
      onClick={() => alert(`Clicked ${title}`)}
    >
      <figure>
        <img src={recipe_img} alt="" />
      </figure>
      <div className="card-body">
        <div className="join self-center">
          {tags.map((it, i) => (
            <div key={i} className="join-item badge badge-primary">
              {it}
            </div>
          ))}
        </div>
        <h3 className="inline-block card-title overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </h3>
      </div>
    </a>
  );
};

const Home = () => {
  const [recipes, setRecipes] = useState([] as RecipeType[]);

  const addNewRecipe = (r: RecipeType) => {
    setRecipes([...recipes, r]);
  };

  useEffect(() => {
    setRecipes(getRecipes(6));
  }, []);

  return (
    <div>
      <h1 className="text-3xl">Home</h1>
      <article>
        <span className="flex flex-row justify-between items-baseline mt-8 mb-3">
          <h2 className="text-xl">Popular Recipes</h2>
          <p className="text-l link">See More</p>
        </span>
        <section className="flex flex-col justify-center items-center gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {recipes.map((recipe, i) => (
            <RecipeCard {...recipe} key={i} />
          ))}
        </section>
      </article>
      <span className="divider" />
      <div>Section 2</div>
      <button
        className="btn btn-circle"
        onClick={() => addNewRecipe(getRecipe())}
      >
        Add new
      </button>
    </div>
  );
};

export default Home;
