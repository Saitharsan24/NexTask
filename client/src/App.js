import './App.css';
import {createBrowserRouter, Route, Link, createRoutesFromElements, RouterProvider} from 'react-router-dom';

//pages
import LandingPageLayout from './layout/landingPageLayout';
import HomePageLayout from './layout/homePageLayout';
import ToDoBoard from './components/todoBoardComponent/toDoBoard'
import Setting from './components/settingComponent/setting'
import ProtectedRoute from './components/protectedRouteComponent/protectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LandingPageLayout />}>
      </Route>
      
        <Route path="/home" element={
          <ProtectedRoute>
            <HomePageLayout />
          </ProtectedRoute>  
        }> 

          <Route index element={
            <ProtectedRoute> 
              <ToDoBoard />
            </ProtectedRoute> 
          } />

        </Route>
        <Route path="/setting" element={<HomePageLayout />}> 
          <Route index element={
            <ProtectedRoute> 
              <Setting />
            </ProtectedRoute> 
          } />  
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
