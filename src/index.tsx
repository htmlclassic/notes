import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PageNotFound } from './components/PageNotFound';

import store from "./app/store";
import { Provider as ReduxProvider } from "react-redux";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export enum Routes {
  root = '/',
  trash = '/trash',
  labels = '/labels'
}

const router = createBrowserRouter([
  {
    element: <App />,
    path: Routes.root,
    errorElement: <PageNotFound />,
    loader: () => 'root',
  },
  {
    path: Routes.trash,
    element: <App />,
    loader: () => 'trash'
  },
  {
    path: `${Routes.labels}/:labelName`,
    element: <App />,
    loader: ({ params }) => params.labelName!
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ReduxProvider store={store} >
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ReduxProvider>
); 