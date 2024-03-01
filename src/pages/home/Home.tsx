import * as mock from "../../resources/mock/recipes.json";

const { recipes } = mock;

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl">Home</h1>
      <article>
        <h2 className="text-xl mt-8 mb-2">Popular Recipes</h2>
        {/* TODO: One day make this work */}
        {/* <Carousel items={carouselItems} /> */}
        <div className="flex flex-row flex-wrap gap-3">
          {recipes.map(({ description, title }, i) => (
            <div
              className="card w-52 card-compact bg-primary shadow-md"
              key={i}
            >
              <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p>{description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-neutral">Read More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>
      <span className="divider" />
      <div>Section 2</div>
    </div>
  );
};

export default Home;
