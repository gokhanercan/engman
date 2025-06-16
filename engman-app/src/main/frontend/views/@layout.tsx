import { createMenuItems, useViewConfig } from '@vaadin/hilla-file-router/runtime.js'
import { effect, signal } from '@vaadin/hilla-react-signals'
import { AppLayout, DrawerToggle, Icon, SideNav, SideNavItem } from '@vaadin/react-components'
import { Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import '../themes/eng-man/main-out.css'
import ModulesMenu from 'Frontend/components/navigation/ModulesMenu'
import { ModuleService, ResourcesService } from 'Frontend/generated/endpoints'
import ModuleInfoM from 'Frontend/generated/com/engman/models/ModuleInfoM'
import { Notification } from '@vaadin/react-components/Notification.js'
import { useModules } from 'Frontend/context/modules-context'

const documentTitleSignal = signal('')
effect(() => {
  document.title = documentTitleSignal.value
})
// Publish for Vaadin to use
;(window as any).Vaadin.documentTitleSignal = documentTitleSignal

export default function MainLayout() {
  const currentTitle = useViewConfig()?.title
  const navigate = useNavigate()
  const location = useLocation()
  const { modules, toggleEnable, setModules, refreshModules } = useModules()

  const onModuleEnable = (module: ModuleInfoM, value: boolean) => {
    const notPending = Notification.show(`Please wait...`, {
      position: 'top-stretch',
      duration: 0,
      theme: 'primary',
    })
    toggleEnable(module.name ?? '', value)
      .then((modules) => {
        notPending.close()
        const notSuc = Notification.show(`Module '${module.name}' has been ${value ? 'enabled' : 'disabled'}.`, {
          position: 'bottom-stretch',
          duration: 2000,
          ...(value && { theme: 'success' }),
        })
      })
      .catch((error) => {
        console.error('Failed to ', error)
        notPending.close()
        const notErr = Notification.show(`Module '${module.name}' could not be ${value ? 'enabled' : 'disabled'}.`, {
          position: 'bottom-stretch',
          duration: 2000,
          theme: 'error',
        })
      })
  }

  useEffect(() => {
    if (currentTitle) {
      documentTitleSignal.value = currentTitle
    }
    refreshModules()
  }, [currentTitle])

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
        <Helmet defaultTitle="engman" titleTemplate="engman – %s" />
        <Outlet />
      </Suspense>
    </AppLayout>
  )
}
