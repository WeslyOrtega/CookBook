// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Timestamp } from "@firebase/firestore";
import { getRecipe } from "../../data/firebase";
import { RecipeType } from "../../utils/recipe-utils";

const RecipeInfo = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [img_url, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([] as string[]);
  const [instructions, setInstructions] = useState([] as string[]);
  const [author, setAuthor] = useState("");
  const [upload_date, setUploadDate] = useState(new Timestamp(0, 0));

  useEffect(() => {
    if (id === undefined) return;

    getRecipe(id).then((doc) => {
      // TODO: Handle resource not found
      if (!doc.exists()) return;
      const data = doc?.data() as RecipeType;
      setName(data?.name);
      setDescription(data?.description);
      setIngredients(data?.ingredients);
      setInstructions(data?.instructions);
      setAuthor(data?.owner);
      setUploadDate(data?.creation_date);
      setImgUrl(data?.img_url);
    });
  }, [id]);

  return (
    <div className="flex flex-col gap-6 sm:pl-8 sm:pr-8">
      <h1 className="text-3xl font-semibold">{name}</h1>
      <span className="flex flex-row gap-1">
        <div>
          Authored by {/* TODO: Profile Screen */}
          <a href="/" className="font-medium text-primary hover:underline">
            {author}
          </a>
        </div>
        <div className="italic font-light">
          | {upload_date.toDate().toDateString()}
        </div>
      </span>
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <img
          className="max-h-96 max-w-96 rounded-3xl"
          src={img_url}
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
