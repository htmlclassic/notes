import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PageNotFound } from './components/PageNotFound';

import store from "./app/store";
import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    errorElement: <PageNotFound />,
  },
  {
    path: '/:label',
    element: <App />
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