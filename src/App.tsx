import Home from "./pages/home/Home";

function App() {
  const NavLink = (props: { href: string; children: string }) => (
    <li className="hover:bg-primary-dark transition-colors p-1">
      <a href={props.href}>{props.children}</a>
    </li>
  );

  return (
    <div className="flex flex-row">
      <nav className="flex flex-col items-center w-72 h-screen p-7 gap-7">
        <h1 className="text-2xl font-semibold">CookBook</h1>
        <div className="w-full">
          <input className="w-full" type="text" placeholder="Search" />
        </div>
        <ul className="w-full text-xl font-semibold flex flex-col gap-2">
          <NavLink href=".">Add a recipe</NavLink>
          <NavLink href=".">Home</NavLink>
          <NavLink href=".">Recipes</NavLink>
          <NavLink href=".">About</NavLink>
        </ul>
      </nav>
      <article className="w-full p-10">
        <Home />
      </article>
    </div>
  );
}

export default App;
