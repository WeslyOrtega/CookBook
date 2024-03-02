import { useEffect, useState } from "react";
import { RecipeType, getRecipe, getRecipes } from "../../utils/recipe-utils";

import recipe_img from "../../resources/mock/recipe.jpg";

const RecipeCard = (props: RecipeType & { key?: number }) => {
  const { title } = props;
  return (
    <a key={props.key} onClick={() => alert(`Clicked ${title}`)}>
      <div className="card w-full shadow-md sm:max-w-48">
        <figure>
          <img src={recipe_img} alt="" />
        </figure>
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
        </div>
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
    setRecipes(getRecipes(5));
  }, []);

  return (
    <div>
      <h1 className="text-3xl">Home</h1>
      <article>
        <span className="flex flex-row justify-between items-baseline mt-8 mb-2">
          <h2 className="text-xl">Popular Recipes</h2>
          <p className="text-l link">See More</p>
        </span>
        <div className="flex flex-col justify-center items-center">
          {recipes.map((recipe, i) => (
            <RecipeCard {...recipe} key={i} />
          ))}
        </div>
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
