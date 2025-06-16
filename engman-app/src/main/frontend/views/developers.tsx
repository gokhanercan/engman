import React, { useEffect, useState } from 'react'
import { ResourcesService } from 'Frontend/generated/endpoints'
import Developers from 'Frontend/components/Developers'
import { Helmet } from 'react-helmet'
import { Routes } from 'Frontend/utils/routes'
import { useModules } from 'Frontend/context/modules-context'

export default function DevelopersView() {
  const [developers, setDevelopers] = useState<any>([])
  const { modules } = useModules()

  useEffect(() => {
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
