import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EditItem,{loader as itemLoader} from './routes/edit';
import ListOfItems ,{loader as itemListLoader} from './routes/listItems';
import ErrorPage from './routes/error';
import './index.css';

const router = createBrowserRouter([
  {
    path:"/",
    element:<ListOfItems/>,
    errorElement:<ErrorPage/>,
    loader:itemListLoader
  },
  {
    path:"/items",
    element:<ListOfItems/>,
    errorElement:<ErrorPage/>,
    loader:itemListLoader
  },
  {
    path:"/edit/:id",
    element:<EditItem/>,
    errorElement:<ErrorPage/>,
    loader:itemLoader
  }
])

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
