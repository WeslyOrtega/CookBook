import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useRef, useState } from "react";
import { RxCamera, RxTrash } from "react-icons/rx";

const NAME_INPUT_ID = "recipe-name-input";
const DESCRIPTION_INPUT_ID = "recipe-description-input";

const RecipeEnter = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);

  const filePickerInput = useRef<HTMLInputElement>(null);

  const handleNameInput = (newVal: string) => {
    setName(newVal.replace(/[^a-zA-Z\s]/, ""));
  };

  const handleIngredientInput = (newVal: string, row: number) => {
    setIngredients(
      ingredients.map((it, i) => {
        if (i === row) return newVal;
        return it;
      })
    );
  };

  const handleIngredientDeletion = (row: number) => {
    const updatedIngredients = [...ingredients.filter((_, i) => i !== row)];
    if (updatedIngredients.length === 0) {
      updatedIngredients.push("");
    }
    setIngredients(updatedIngredients);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor={NAME_INPUT_ID}>Recipe Name</Label>
        <Input
          id={NAME_INPUT_ID}
          className="w-full"
          placeholder="Eg. Roasted Chicken"
          value={name}
          maxLength={100}
          onChange={(e) => {
            handleNameInput(e.target.value);
          }}
        />
      </div>
      <Input type="file" ref={filePickerInput} className="hidden" />
      {/* TODO: Actually pick file */}
      <div className="sm:w-[350px]">
        <AspectRatio ratio={1}>
          <Button
            className="w-full h-full p-28"
            variant="outline"
            onClick={() => filePickerInput.current?.click()}
          >
            <RxCamera className="h-full w-full" />
          </Button>
        </AspectRatio>
      </div>
      <div>
        <Label htmlFor={DESCRIPTION_INPUT_ID}>Description</Label>
        <Textarea
          id={DESCRIPTION_INPUT_ID}
          placeholder="Eg. Very taste and easy to make"
          maxLength={500}
          expand
          value={description}
          onInput={(e) => setDescription(e.currentTarget.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2>Ingredients</h2>
        <ul className="flex flex-col gap-2">
          {ingredients.map((it, i) => (
            <li key={`ingredient ${i}`} className="flex flex-col gap-2">
              <Label>Ingredient {i + 1}</Label>
              <div className="flex flex-row gap-4">
                <Input
                  maxLength={30}
                  placeholder="Eg. 1 Chicken Breast"
                  value={it}
                  onInput={(e) =>
                    handleIngredientInput(e.currentTarget.value, i)
                  }
                />
                <Button variant="destructive" className="py-1 px-2">
                  <RxTrash
                    className="w-full h-full"
                    onClick={() => handleIngredientDeletion(i)}
                  />
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <Button
          variant="secondary"
          onClick={() => setIngredients([...ingredients, ""])}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default RecipeEnter;
