import router from 'Frontend/routes.js';
import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';

export default function App() {
  return <RouterProvider router={router} />;
}
