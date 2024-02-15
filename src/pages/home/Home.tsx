import { RxArrowLeft, RxArrowRight } from "react-icons/rx";

const carouselItems: Array<{ title: string; desc: string }> = [
  { title: "Item 1", desc: "Description for Item" },
  { title: "Item 2", desc: "Description for Item" },
  { title: "Item 3", desc: "Description for Item" },
  { title: "Item 4", desc: "Description for Item" },
  { title: "Item 5", desc: "Description for Item" },
  { title: "Item 6", desc: "Description for Item" },
  { title: "Item 7", desc: "Description for Item" },
  { title: "Item 8", desc: "Description for Item" },
  { title: "Item 9", desc: "Description for Item" },
  { title: "Item 10", desc: "Description for Item" },
];

const Home = () => (
  <div>
    <h1 className="text-3xl">Home</h1>
    <article>
      <h2 className="text-xl mt-8 mb-2">Popular Recipes</h2>
      <div className="flex flex-nowrap w-full items-center">
        <button className="btn btn-ghost p-3">
          {/* TODO: Make these actually work */}
          <RxArrowLeft className="w-full h-full" />
        </button>
        <div className="carousel space-x-2 p-4 rounded-box">
          {carouselItems.map(({ title, desc }, index) => (
            <div className="carousel-item" key={index}>
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
        <button className="btn btn-ghost p-3">
          <RxArrowRight className="w-full h-full" />
        </button>
      </div>
    </article>
    <span className="divider" />
    <div>Section 2</div>
  </div>
);

export default Home;
