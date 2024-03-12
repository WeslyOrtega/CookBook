import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { RxLinkBreak1 } from "react-icons/rx";

enum ImgState {
  loading,
  error,
  loaded,
}

const FirebaseImg = (props: { img_url: string; className?: string }) => {
  const { img_url, className } = props;
  const [img_state, setImageState] = useState(ImgState.loading);

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
          src={img_url}
          alt="Picture of recipe"
          onLoad={() => setImageState(ImgState.loaded)}
        />
      )}
    </>
  );
};

export default FirebaseImg;
