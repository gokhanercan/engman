import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import ContactsView from 'Frontend/views/contacts/ContactsView.js';
const AboutView = lazy(async () => import('Frontend/views/about/AboutView.js'));
const SkillsView = lazy(async () => import('Frontend/views/skills/SkillsView.js'));
const DevelopersView = lazy(async () => import('Frontend/views/developers/DevelopersView.js'));

export const routes = [
  {
    element: <MainLayout />,
    handle: { title: 'Hilla CRM' },
    children: [
      { path: '/', element: <ContactsView />, handle: { title: 'Contacts' } },
      { path: '/about', element: <AboutView />, handle: { title: 'About' } },
      { path: '/skills', element: <SkillsView />, handle: { title: 'Skills' } },
      { path: '/developers', element: <DevelopersView />, handle: { title: 'Developers' } }
    ],
  },
] as RouteObject[];

export default createBrowserRouter(routes);
