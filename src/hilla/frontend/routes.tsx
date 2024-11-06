import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy } from 'react';
import { useLocation } from 'react-router-dom';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import ContactsView from 'Frontend/views/contacts/ContactsView.js';
const AboutView = lazy(async () => import('Frontend/views/about/AboutView.js'));
const SkillsView = lazy(async () => import('Frontend/views/skills/SkillsView.js'));
const DevelopersView = lazy(async () => import('Frontend/views/developers/DevelopersView.js'));
const GenericListView = lazy(async () => import('Frontend/views/gen-list/GenListView.js'));

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// const GenericListViewWrapper = () => {
//   const query = useQuery();
//   const entityName = query.get('e');
//   if(!entityName) throw new Error("entityName cannot be null or empty");
//   return <GenericListView entityName={entityName} />;
// }

export const routes = [
  {
    element: <MainLayout />,
    handle: { title: 'Hilla CRM' },
    children: [
      { path: '/', element: <ContactsView />, handle: { title: 'Contacts' } },
      { path: '/about', element: <AboutView />, handle: { title: 'About' } },
      { path: '/skills', element: <SkillsView />, handle: { title: 'Skills' } },
      { path: '/developers', element: <DevelopersView />, handle: { title: 'Developers' } },
      { path: '/gen-list?', element: <GenericListView />, handle: { title: 'Generic List' } }
    ],
  },
] as RouteObject[];

export default createBrowserRouter(routes);
