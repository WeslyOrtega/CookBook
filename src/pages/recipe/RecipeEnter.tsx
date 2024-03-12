import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { RxCamera, RxTrash } from "react-icons/rx";
import { uploadRecipe } from "@/src/data/firebase";
import { Timestamp } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";

const DESCRIPTION_INPUT_ID = "recipe-description-input";

const formSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Must be at least 5 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Can only contain letters and spaces" }),
  ingredients: z
    .array(
      z.object({
        val: z.string().min(1, { message: "Must be at least 1 character" }),
      })
    )
    .nonempty(),
  instructions: z
    .array(
      z.object({
        val: z.string().min(1, { message: "Must be at least 1 character" }),
      })
    )
    .nonempty(),
  description: z
    .string()
    .regex(/\S+\s\S+/, { message: "Must be at least 2 words" }),
});

const RecipeEnter = () => {
  const [img, setImg] = useState("");
  const [uploaded, setUploaded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      ingredients: [{ val: "" }],
      instructions: [{ val: "" }],
    },
  });
  const {
    fields: ingredients,
    append: addIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });
  const {
    fields: instructions,
    append: addInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control: form.control,
    name: "instructions",
  });

  const filePickerInput = useRef<HTMLInputElement>(null);

  const handleImgUpload = () => {
    // TODO: Show modal + crop image
    const file = filePickerInput.current?.files?.item(0);
    if (file) {
      setImg(URL.createObjectURL(file));
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
    // TODO: show toast
    // uploadRecipe(
    //   {
    //     name,
    //     ingredients,
    //     instructions,
    //     description,
    //     tags: [],
    //     owner: "Wesly Ortega",
    //     creation_date: Timestamp.now(),
    //   },
    //   filePickerInput.current?.files?.item(0)!
    // ).then((_) => setUploaded(true));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe Name</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Eg. Roasted Chicken"
                  maxLength={100}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={DESCRIPTION_INPUT_ID}>Description</FormLabel>
              <Textarea
                id={DESCRIPTION_INPUT_ID}
                placeholder="Eg. Very taste and easy to make"
                maxLength={500}
                autoExpand
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <h2>Ingredients</h2>
          {ingredients.map((_, i) => {
            return (
              <FormField
                control={form.control}
                key={i}
                name={`ingredients.${i}.val`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ingredient {i + 1}</FormLabel>
                    <div className="flex flex-row gap-4">
                      <Input
                        maxLength={30}
                        placeholder="Eg. 1 Chicken Breast"
                        {...field}
                      />
                      <Button variant="destructive" className="py-1 px-2">
                        <RxTrash
                          className="w-full h-full"
                          onClick={() => removeIngredient(i)}
                        />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <Button
            variant="secondary"
            onClick={() => addIngredient({ val: "" })}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <h2>Instructions</h2>
          {instructions.map((_, i) => {
            return (
              <FormField
                control={form.control}
                key={i}
                name={`instructions.${i}.val`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Step {i + 1}</FormLabel>
                    <div className="flex flex-row gap-4">
                      <Input
                        maxLength={30}
                        placeholder="Eg. 1 Chicken Breast"
                        {...field}
                      />
                      <Button variant="destructive" className="py-1 px-2">
                        <RxTrash
                          className="w-full h-full"
                          onClick={() => removeInstruction(i)}
                        />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <Button
            variant="secondary"
            onClick={() => addInstruction({ val: "" })}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-row gap-2">
          <Button type="submit" className="w-full">
            Save
          </Button>
          <Button className="w-full" variant="destructive">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
    // <div className="flex flex-col gap-4">
    //   <Input
    //     type="file"
    //     ref={filePickerInput}
    //     className="hidden"
    //     accept="image/jpeg, image/png, image/jpg"
    //     onChange={() => handleImgUpload()}
    //   />
    //   <div className="sm:w-[350px] rounded-2xl overflow-hidden">
    //     <AspectRatio ratio={1}>
    //       {img === "" && (
    //         <Button
    //           className="w-full h-full p-28"
    //           variant="outline"
    //           onClick={() => filePickerInput.current?.click()}
    //         >
    //           <RxCamera className="h-full w-full" />
    //         </Button>
    //       )}
    //       {img !== "" && <img src={img} className="w-full h-full" />}
    //     </AspectRatio>
    //   </div>
    //   {uploaded && <Navigate to="/" />}
    // </div>
  );
};

export default RecipeEnter;
