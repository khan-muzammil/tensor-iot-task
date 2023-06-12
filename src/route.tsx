import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import ErrorPage from "./components/ErrorPage";
import Dashboard from "./Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicLayout />} errorElement={<ErrorPage />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </>
  )
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
