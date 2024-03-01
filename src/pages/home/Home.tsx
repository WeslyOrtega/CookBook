import { useEffect, useState } from "react";
import { LoremIpsum } from "lorem-ipsum";
import mock from "../../resources/mock/recipes.json";

type RecipeType = (typeof mock.recipes)[0];

const lorem = new LoremIpsum();

const RecipeCard = (props: { title: string; description: string }) => {
  return (
    <div className="card w-52 card-compact bg-primary shadow-md">
      <div className="card-body">
        <h3 className="card-title">{props.title}</h3>
        <p>{props.description}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-neutral"
            onClick={() => alert(props.description)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [recipes, setRecipes] = useState([] as RecipeType[]);

  const addNewRecipe = (r: RecipeType) => {
    setRecipes([...recipes, r]);
  };

  useEffect(() => {
    setRecipes(mock.recipes);
  }, []);

  return (
    <div>
      <h1 className="text-3xl">Home</h1>
      <article>
        <h2 className="text-xl mt-8 mb-2">Popular Recipes</h2>
        {/* TODO: One day make this work */}
        {/* <Carousel items={carouselItems} /> */}
        <div className="flex flex-row flex-wrap gap-3">
          {recipes.map(({ description, title }, i) => (
            <RecipeCard title={title} description={description} />
          ))}
        </div>
      </article>
      <span className="divider" />
      <div>Section 2</div>
      <button
        className="btn btn-circle"
        onClick={() =>
          addNewRecipe({
            title: lorem.generateWords(3),
            description: lorem.generateSentences(2),
          })
        }
      >
        Add new
      </button>
    </div>
  );
};

export default Home;
