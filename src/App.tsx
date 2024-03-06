import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/home/Home";
import ContentWrapper from "./components/Layout/ContentWrapper";
import RecipeInfo from "./pages/recipe/RecipeInfo";
import RecipeEnter from "./pages/recipe/RecipeEnter";

import { ThemeProvider } from "@/components/theme-provider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<ContentWrapper />}>
      <Route index element={<Home />} />
      <Route path="recipe">
        <Route path="new" element={<RecipeEnter />} />
        <Route path=":id" element={<RecipeInfo />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
  // return <RouterProvider router={router} />;
}

export default App;
