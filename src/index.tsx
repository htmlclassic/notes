import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NoteList } from './components/NoteList';
import { PageNotFound } from './components/PageNotFound';

import store from "./app/store";
import { Provider } from "react-redux";

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <NoteList filter="all" />
      },
      {
        path: "/archived",
        element: <NoteList filter="archived" />,
      }
    ]
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