import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/layout/Layout';

// Import route components
import HomePage from './home';
import ProductDetailsPage from './products/[id]';
import LoginPage from './auth/login';
import RegisterPage from './auth/register';
import NotFoundPage from './not-found';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products/:id',
        element: <ProductDetailsPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      // Example of protected route
      // {
      //   path: 'profile',
      //   element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
      // },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
