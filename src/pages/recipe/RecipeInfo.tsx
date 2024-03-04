import { useParams } from "react-router-dom";

const RecipeInfo = () => {
  const { id } = useParams();

  return <h1>{id}</h1>;
};

export default RecipeInfo;
