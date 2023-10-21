import './App.css';
import {createBrowserRouter, Route, Link, createRoutesFromElements, RouterProvider} from 'react-router-dom';

//pages
import LandingPageLayout from './layout/landingPageLayout';
import HomePageLayout from './layout/homePageLayout';
import ToDoBoard from './components/todoBoardComponent/toDoBoard'
import Setting from './components/settingComponent/setting'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LandingPageLayout />}>
      </Route>
      <Route path="/home" element={<HomePageLayout />}> 
        <Route index element={<ToDoBoard />} />
      </Route>
      <Route path="/setting" element={<HomePageLayout />}> 
        <Route index element={<Setting />} />
      </Route>
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
