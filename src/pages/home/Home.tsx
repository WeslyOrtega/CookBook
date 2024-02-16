import Carousel from "../../components/carousel/carousel";

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

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl">Home</h1>
      <article>
        <h2 className="text-xl mt-8 mb-2">Popular Recipes</h2>
        <Carousel items={carouselItems} />
      </article>
      <span className="divider" />
      <div>Section 2</div>
    </div>
  );
};

export default Home;
