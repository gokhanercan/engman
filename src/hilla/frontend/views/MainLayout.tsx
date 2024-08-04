import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import { useRouteMetadata } from 'Frontend/util/routing.js';
import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const navLinkClasses = ({ isActive }: any) => {
  return `block p-1 ${isActive ? 'bg-primary-10 text-primary font-bold' : 'text-body'}`;
};

export default function MainLayout() {
  const currentTitle = useRouteMetadata()?.title ?? 'engman';
  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="flex flex-col justify-between h-full p-4">
        <header className="flex flex-col gap-4">
          <h1 className="text-lg font-bold no-underline">
              <a href="/" className='no-underline hover:no-underline'>Engineering Manager</a>
          </h1>
          <nav>
            <NavLink className={navLinkClasses} to="/">Contacts</NavLink>
            <NavLink className={navLinkClasses} to="/about">About</NavLink>
            <NavLink className={navLinkClasses} to="/skills">Skills</NavLink>
            <NavLink className={navLinkClasses} to="/developers">Developers</NavLink>
          </nav>
        </header>
      </div>

      <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
      <h2 slot="navbar" className="text-lg">
        {currentTitle}
      </h2>

      <Suspense fallback={<Placeholder />}>
        <div className='p-4'>
          <Outlet />
        </div>
      </Suspense>
    </AppLayout>
  );
}
