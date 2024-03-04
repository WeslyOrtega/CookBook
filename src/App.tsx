import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/home/Home";
import ContentWrapper from "./components/Layout/ContentWrapper";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<ContentWrapper />}>
      <Route index element={<Home />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
