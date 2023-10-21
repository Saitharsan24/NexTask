import './App.css';
import {createBrowserRouter, Route, Link, createRoutesFromElements, RouterProvider} from 'react-router-dom';

//pages
import LandingPageLayout from './layout/landingPageLayout';
import HomePageLayout from './layout/homePageLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LandingPageLayout />}>
      
    </Route>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
