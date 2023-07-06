import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PageNotFound } from './components/PageNotFound';

import store from "./app/store";
import { Provider } from "react-redux";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <Navigate to="notes?filter=All" />,
    path: '/',
    errorElement: <PageNotFound />,
  },
  {
    path: "/notes",
    element: <App />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store} >
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);