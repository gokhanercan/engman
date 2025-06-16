import React, { useEffect, useState } from 'react'
import { ModuleService, ResourcesService } from 'Frontend/generated/endpoints'
import Developers from 'Frontend/components/Developers'
import DeveloperM from 'Frontend/generated/com/engman/models/DeveloperM'
import { Helmet } from 'react-helmet'
import { Routes } from 'Frontend/utils/routes'
import ModuleInfoM from 'Frontend/generated/com/engman/models/ModuleInfoM'

export default function DevelopersView() {
  const [developers, setDevelopers] = useState<any>([])
  const [modules, setModules] = useState<ModuleInfoM[]>([])

  useEffect(() => {
    //TODO: Make it more generic, we load it everywhere. Make it a global state or context.
    ModuleService.getModuleInfo()
      .then((modules) => {
        console.log('Modules refreshed', modules)
        setModules(modules)
      })
      .catch((error) => {
        console.error('Failed to fetch modules', error)
      })
    ResourcesService.getDevelopers()
      .then((devs) => {
        setDevelopers(devs)
      })
      .catch((error) => {
        console.error('Failed to fetch developers', error)
      })
  }, [])

  return (
    <>
      <Helmet>
        <title>Developers</title>
      </Helmet>
      <Developers
        developers={developers}
        title=""
        showProgressBars={false}
        developerDetailLink={Routes.developerDetailLink}
        showModuleFields={true}
        modules={modules}
      />
    </>
  )
}
