import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ReactCrop, { Crop, PixelCrop, centerCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

enum Stage {
  Upload,
  Crop,
}

const renderCrop = (
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // TODO: Continue watching https://youtu.be/odscV57kToU?t=1635
};

const ImageUploadModal = () => {
  const [stage, setStage] = useState(Stage.Upload);
  const [img, setImg] = useState("");
  const [crop, setCrop] = useState<Crop>();

  const handleImgSelected = (img?: File | null) => {
    if (img) {
      setImg(URL.createObjectURL(img));
      setStage(Stage.Crop);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height } = e.currentTarget;
    const smallestSide = Math.min(width, height);
    setCrop(
      centerCrop(
        {
          unit: "%",
          height: (smallestSide / height) * 100,
          width: (smallestSide / width) * 100,
        },
        width,
        height
      )
    );
  };

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          {stage === Stage.Upload && (
            <>
              <DialogTitle>Upload Image</DialogTitle>
              <DialogDescription>
                Select the image you would like to use for your recipe
              </DialogDescription>
            </>
          )}
          {stage === Stage.Crop && (
            <>
              <DialogTitle>Crop Image</DialogTitle>
              <DialogDescription>
                Crop your image to better fit
              </DialogDescription>
            </>
          )}
        </DialogHeader>
        {stage === Stage.Upload && (
          <Input
            type="file"
            onChange={(e) => handleImgSelected(e.currentTarget.files?.item(0))}
          />
        )}
        {stage === Stage.Crop && (
          <ReactCrop
            crop={crop}
            onChange={(_, e) => setCrop(e)}
            keepSelection
            aspect={1}
          >
            <img src={img} onLoad={(e) => onImageLoad(e)}></img>
          </ReactCrop>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;
