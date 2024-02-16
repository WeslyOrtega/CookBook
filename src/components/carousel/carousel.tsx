import { useEffect, useRef, useState } from "react";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";

const Carousel = (props: { items: Array<{ title: string; desc: string }> }) => {
  const [offset, setOffset] = useState(0);
  const [scrollAmt, setScrollAmt] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSetScrollAmt = () => {
      const carouselWidth = ref.current?.offsetWidth ?? 0;
      console.log("width", carouselWidth);
      setScrollAmt(carouselWidth);
    };

    window.addEventListener("resize", handleSetScrollAmt);

    if (ref.current) {
      handleSetScrollAmt();
    }
    // eslint-disable-next-line
  }, [ref.current]);

  const scrollCarousel = (amt: number) => {
    // Idea: get all children of ref and check which are visible.
    // Then do a .scroll() on first child that is not fully visible.

    let scrollAmt = offset + amt;
    if (scrollAmt > 0) scrollAmt = 0;
    setOffset(scrollAmt);
  };

  return (
    <div className="flex flex-nowrap w-full items-center">
      <button
        className={`btn btn-ghost p-3 ${
          offset < 0 ? "" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => scrollCarousel(scrollAmt)}
      >
        <RxArrowLeft className="w-full h-full" />
      </button>
      <div ref={ref} className="carousel gap-2 p-4 rounded-box">
        {props.items.map(({ title, desc }, index) => (
          <div
            className="carousel-item"
            key={index}
            style={{
              transform: `translate(${offset}px, 0)`,
              transition: "transform 0.3s",
            }}
          >
            <div className="card w-52 card-compact bg-primary shadow-md">
              <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p>{desc}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-neutral">Read More</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="btn btn-ghost p-3"
        onClick={() => scrollCarousel(-scrollAmt)}
      >
        {/* TODO: Disable arrow when reaching end */}
        <RxArrowRight className="w-full h-full" />
      </button>
    </div>
  );
};

export default Carousel;
