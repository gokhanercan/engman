import { createMenuItems, useViewConfig } from '@vaadin/hilla-file-router/runtime.js';
import { effect, signal } from '@vaadin/hilla-react-signals';
import { AppLayout, DrawerToggle, Icon, SideNav, SideNavItem } from '@vaadin/react-components';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import "../themes/eng-man/main-out.css";
import ModulesMenu from 'Frontend/components/navigation/ModulesMenu';

const documentTitleSignal = signal('');
effect(() => {
  document.title = documentTitleSignal.value;
});

// Publish for Vaadin to use
(window as any).Vaadin.documentTitleSignal = documentTitleSignal;

export default function MainLayout() {
  const currentTitle = useViewConfig()?.title;
  const navigate = useNavigate();
  const location = useLocation();

  const modules = [
    {name:"TrueColors", enabled:true},
    {name:"Scrum", enabled:true},
    {name:"Kanban", enabled:false}
  ];

  useEffect(() => {
    if (currentTitle) {
      documentTitleSignal.value = currentTitle;
    }
  }, [currentTitle]);

  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="flex flex-col justify-between h-full p-m text-center1">
        <header className="flex flex-col gap-m">
          <a href="/" className="flex items-center gap-m" style={{ color: 'black' }}>
            <span className="font-semibold text-xl">engman</span>
          </a>
          <SideNav onNavigate={({ path }) => navigate(path!)} location={location}>
            {createMenuItems().map(({ to, title, icon }) => (
              <SideNavItem path={to} key={to}>
                {icon ? <Icon src={icon} slot="prefix"></Icon> : <></>}
                {title}
              </SideNavItem>
            ))}
          </SideNav>
          
          <ModulesMenu modules={modules} />

        </header>
      </div>

      <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
      <h1 slot="navbar" className="text-l m-0">
        {documentTitleSignal}
      </h1>

      <Suspense>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
