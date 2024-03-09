import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useRef, useState } from "react";
import { RxCamera } from "react-icons/rx";

const NAME_INPUT_ID = "recipe-name-input";
const DESCRIPTION_INPUT_ID = "recipe-description-input";

const RecipeEnter = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const filePickerInput = useRef<HTMLInputElement>(null);

  const handleNameInput = (newVal: string) => {
    setName(newVal.replace(/[^a-zA-Z\s]/, ""));
  };

  return (
    <div className="flex flex-col gap-4">
      <span>
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
      </span>
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
      <span>
        <Label htmlFor={DESCRIPTION_INPUT_ID}>Description</Label>
        <Textarea
          id={DESCRIPTION_INPUT_ID}
          placeholder="Eg. Very taste and easy to make"
          maxLength={500}
          expand
          value={description}
          onInput={(e) => setDescription(e.currentTarget.value)}
        />
      </span>
    </div>
  );
};

export default RecipeEnter;
