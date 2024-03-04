// import { useParams } from "react-router-dom";
import { getRecipe } from "../../utils/recipe-utils";

const RecipeInfo = () => {
  // const { id } = useParams();
  const {
    name,
    img_url,
    description,
    ingredients,
    instructions,
    author_name,
    upload_date,
  } = getRecipe();

  return (
    <div className="flex flex-col gap-6 sm:pl-8 sm:pr-8">
      <h1 className="text-3xl font-semibold">{name}</h1>
      <p className="flex flex-row gap-1">
        <div>
          Authored by {/* TODO: Profile Screen */}
          <a href="/" className="font-medium text-primary hover:underline">
            {author_name}
          </a>
        </div>
        <div className="italic font-light">| {upload_date}</div>
      </p>
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <img
          className="sm:max-h-96 rounded-3xl"
          src={require(`../../resources/mock/${img_url}`)}
          alt="Picute of recipe"
        />
        <p className="sm:max-w-xl">{description}</p>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl">Ingredients</h2>
        <ul className="list-disc list-inside">
          {ingredients.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl">Steps</h2>
        <ul className="flex flex-col gap-3 list-decimal list-inside marker:font-bold marker:text-primary w-full sm:w-3/4 md:w-1/2">
          {instructions.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default RecipeInfo;
