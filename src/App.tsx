import { RxHamburgerMenu, RxSun, RxMoon } from "react-icons/rx";

import Home from "./pages/home/Home";
import { useEffect } from "react";
import { themeChange } from "theme-change";

const SideDrawerLinks: Array<{ href: string; text: string }> = [
  {
    href: ".",
    text: "Home",
  },
  {
    href: ".",
    text: "Explore",
  },
  {
    href: ".",
    text: "My Recipes",
  },
  {
    href: ".",
    text: "Account",
  },
];

const NavWrapper = (props: { children: React.JSX.Element }) => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="drawer">
      <input id="side-drawer" className="drawer-toggle" type="checkbox" />
      <div className="drawer-side z-10">
        <label htmlFor="side-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-100">
          {SideDrawerLinks.map(({ href, text }, index) => (
            <li key={index}>
              <a href={href}>{text}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="drawer-content">
        <nav className="navbar bg-base-200">
          <div>
            <label
              className="btn btn-ghost btn-square drawer-button btn-md p-2"
              onClick={() => document.getElementById("side-drawer")?.click()}
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
          <div className="navbar-end">
            <label className="btn btn-circle btn-ghost shadow-none swap">
              <input
                type="checkbox"
                value="dark"
                className="theme-controller"
              />
              <RxSun className="swap-off fill-current size-6" />
              <RxMoon className="swap-on fill-current size-6" />
            </label>
          </div>
        </nav>
        <main className="p-5 flex flex-col items-center">
          <div className="max-w-screen-xl w-full">{props.children}</div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <NavWrapper>
      <Home />
    </NavWrapper>
  );
}

export default App;
