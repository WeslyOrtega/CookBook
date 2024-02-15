import { RxHamburgerMenu } from "react-icons/rx";

import Home from "./pages/home/Home";

const NavLink = (props: { href: string; children: string }) => (
  <li>
    <a href={props.href}>{props.children}</a>
  </li>
);

const NavWrapper = (props: { children: React.JSX.Element }) => (
  <div className="drawer">
    <input id="side-drawer" className="drawer-toggle" type="checkbox" />
    <div className="drawer-side">
      <label htmlFor="side-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 min-h-full bg-base-100">
        <NavLink href=".">Add a recipe</NavLink>
        <NavLink href=".">Home</NavLink>
        <NavLink href=".">Recipes</NavLink>
        <NavLink href=".">About</NavLink>
      </ul>
    </div>
    <div className="drawer-content">
      <nav className="navbar bg-base-300">
        <div>
          <label
            htmlFor="side-drawer"
            className="btn btn-ghost btn-square drawer-button btn-md p-2"
          >
            <RxHamburgerMenu className="w-full h-full" />
          </label>
        </div>
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <a href="." className="btn no-animation btn-ghost text-xl">
            Your CookBook
          </a>
        </div>
        {/* Empty end to actually center navbar-center */}
        <div className="navbar-end" />
      </nav>
      {props.children}
    </div>
  </div>
);

function App() {
  return (
    <NavWrapper>
      <Home />
    </NavWrapper>
  );
}

export default App;
