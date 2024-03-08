import { Skeleton } from "@/components/ui/skeleton";
import { getRecipeImage } from "@/src/data/firebase";
import { useEffect, useState } from "react";
import { RxLinkBreak1 } from "react-icons/rx";

enum ImgState {
  loading,
  error,
  loaded,
}

const FirebaseImg = (props: { img_url: string; className?: string }) => {
  const { img_url, className } = props;
  const [firebase_url, setImg] = useState("");
  const [img_state, setImageState] = useState(ImgState.loading);

  useEffect(() => {
    getRecipeImage(img_url)
      .then((it) => {
        setImg(it);
      })
      .catch(() => setImageState(ImgState.error));
  }, [img_url]);

  return (
    <>
      {img_state === ImgState.loading && (
        <Skeleton className={className}>
          <RxLinkBreak1 className="w-full h-full p-20 opacity-0" />
        </Skeleton>
      )}
      {img_state === ImgState.error && (
        <div className={className}>
          <RxLinkBreak1 className="w-full h-full p-20" />
        </div>
      )}
      {img_state !== ImgState.error && (
        <img
          style={img_state === ImgState.loaded ? {} : { display: "none" }}
          className={className}
          src={firebase_url}
          alt="Picture of recipe"
          onLoad={() => setImageState(ImgState.loaded)}
        />
      )}
    </>
  );
};

export default FirebaseImg;
