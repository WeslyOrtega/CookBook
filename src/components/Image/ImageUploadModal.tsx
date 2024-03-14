import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  convertToPixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

enum Stage {
  Upload,
  Crop,
}

// Src: https://youtu.be/odscV57kToU
const renderCrop = (
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const pixelRatio = window.devicePixelRatio;
  const scaleX = img.naturalWidth / img.width;
  const scaleY = img.naturalHeight / img.height;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";
  ctx.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  ctx.translate(-cropX, -cropY);
  ctx.drawImage(
    img,
    0,
    0,
    img.naturalWidth,
    img.naturalHeight,
    0,
    0,
    img.naturalWidth,
    img.naturalHeight
  );

  ctx.restore();
};

const ImageUploadModal = (props: {
  isOpen: boolean;
  saveImgUrl: (url: string) => void;
  closeModal: () => void;
}) => {
  const { isOpen, saveImgUrl, closeModal } = props;

  const [stage, setStage] = useState(Stage.Upload);
  const [img, setImg] = useState("");
  const [crop, setCrop] = useState<Crop>();

  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const disposeModal = () => {
    closeModal();
    setCrop(undefined);
    setImg("");
    setStage(Stage.Upload);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => disposeModal()}>
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
          <>
            {/* Use drop area asset */}
            <Input
              type="file"
              onChange={(e) =>
                handleImgSelected(e.currentTarget.files?.item(0))
              }
            />
          </>
        )}
        {stage === Stage.Crop && (
          <>
            <ReactCrop
              crop={crop}
              onChange={(_, e) => setCrop(e)}
              keepSelection
              aspect={1}
            >
              <img
                className="max-w-full"
                ref={imgRef}
                src={img}
                onLoad={(e) => onImageLoad(e)}
              ></img>
            </ReactCrop>
            <div className="w-full flex flex-row gap-4">
              <Button
                className="w-full"
                variant={"secondary"}
                onClick={() => disposeModal()}
              >
                Cancel
              </Button>
              <Button
                className="w-full"
                onClick={() => {
                  renderCrop(
                    imgRef.current!,
                    canvasRef.current!,
                    convertToPixelCrop(
                      crop!,
                      imgRef.current!.width,
                      imgRef.current!.height
                    )
                  );
                  saveImgUrl(canvasRef.current!.toDataURL());
                  disposeModal();
                }}
              >
                Apply
              </Button>
            </div>
            <canvas className="hidden" ref={canvasRef} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;
