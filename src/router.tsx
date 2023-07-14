import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import SwissKnife from "./pages/swiss knife";
import TTT from "./pages/swiss knife/pages/ttt";
import Crud from "./pages/swiss knife/pages/crud";
import Weather from "./pages/swiss knife/pages/weather";


const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path:"/swissKnife",element:<SwissKnife/>,
      children:[
        {path:'/swissKnife/ttt',element:<TTT/>,},
        {path:'/swissKnife/crud',element:<Crud/>,},
        {path:'/swissKnife/weather',element:<Weather/>,},
      ]}
]);
export default router;
