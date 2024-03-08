import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRecipeImage, recipesDB } from "../../data/firebase";
import { RecipeType, getRecipe } from "../../utils/recipe-utils";

const RecipeCard = (props: RecipeType) => {
  const { id, name, img_url } = props;
  const [img, setImg] = useState("");

  console.log(id);

  useEffect(() => {
    getRecipeImage(img_url).then((it) => {
      setImg(it);
    });
  }, [img_url]);

  return (
    <a className="w-5/6 sm:w-full h-full" href={`/recipe/${id}`}>
      <Card className="overflow-hidden h-full">
        <figure>
          <img src={img} alt="Picture of recipe" className="bg-cover" />
        </figure>
        <CardHeader>
          <CardTitle className="inline-block card-title overflow-hidden whitespace-nowrap text-ellipsis">
            {name}
          </CardTitle>
        </CardHeader>
      </Card>
    </a>
  );
};

const Home = () => {
  const [recipes, setRecipes] = useState([] as RecipeType[]);

  const addNewRecipe = (r: RecipeType) => {
    setRecipes([...recipes, r]);
  };

  useEffect(() => {
    getDocs(recipesDB).then((r) => {
      const docs = r.docs;
      const recipes = docs.map((it) => {
        return { ...it.data(), id: it.id } as RecipeType;
      });
      console.log({ recipes });
      setRecipes(recipes);
    });
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
