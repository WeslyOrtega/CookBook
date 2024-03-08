import { Skeleton } from "@/components/ui/skeleton";
import { getRecipeImage } from "@/src/data/firebase";
import { useEffect, useState } from "react";
import { RxLinkBreak1 } from "react-icons/rx";

const FirebaseImg = (props: { img_url: string; className?: string }) => {
  const { img_url, className } = props;
  const [img, setImg] = useState("");

  const image_load_error = "<LOAD_ERROR>";

  useEffect(() => {
    getRecipeImage(img_url)
      .then((it) => {
        setImg(it);
        console.log(img);
      })
      .catch(() => setImg(image_load_error));
  }, [img_url]);

  return (
    <>
      {img == "" && <Skeleton className={className} />}
      {img == image_load_error && (
        <div className={className}>
          <RxLinkBreak1 className="w-full h-full p-20" />
        </div>
      )}
      {img != "" && img != image_load_error && (
        <figure className={className}>
          <img src={img} alt="Picture of recipe" />
        </figure>
      )}
    </>
  );
};

export default FirebaseImg;
