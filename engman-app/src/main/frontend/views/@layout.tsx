import { createMenuItems, useViewConfig } from '@vaadin/hilla-file-router/runtime.js';
import { effect, signal } from '@vaadin/hilla-react-signals';
import { AppLayout, DrawerToggle, Icon, SideNav, SideNavItem } from '@vaadin/react-components';
import { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import "../themes/eng-man/main-out.css";
import ModulesMenu from 'Frontend/components/navigation/ModulesMenu';
import { ResourcesService } from 'Frontend/generated/endpoints';
import ModuleInfoM from 'Frontend/generated/com/engman/models/ModuleInfoM';

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
  const [modules,setModules] = useState<ModuleInfoM[]>([]);

  const onModuleEnable = (module: ModuleInfoM, checked: boolean) => {
    console.log(`Module ${module.name} is ${checked ? 'enabled' : 'disabled'}`);
    //TODO: Call BE endpoint here.. and refresh.
    setModules(modules.map(m => m.name === module.name ? { ...m, enabled: checked } : m));
  }

  useEffect(() => {
    if (currentTitle) {
      documentTitleSignal.value = currentTitle;
    }

    ResourcesService.getModuleInfo().then(modules=>{
      console.log("Modules",modules);
        setModules(modules);
      })
      .catch(error => {
          console.error("Failed to fetch modules", error);
      });
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
          
          <ModulesMenu modules={modules} onModuleEnable={onModuleEnable} />

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
