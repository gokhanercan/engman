import DeveloperCard from 'Frontend/components/cards/DeveloperCard'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'
import React, { useEffect, useState } from 'react'
import { ResourcesService } from 'Frontend/generated/endpoints'
import DeveloperM from 'Frontend/generated/com/engman/models/DeveloperM'
import { useModules } from 'Frontend/context/modules-context'

export default function DeveloperDetail() {
  const [developer, setDeveloper] = useState<DeveloperM>({})
  const { id, edit } = useParams<{ id: string; edit: string }>()
  const editMode: boolean = edit === 'edit'
  const { modules } = useModules()

  useEffect(() => {
    if (!id) {
      throw new Error('Developer ID is not provided in the URL parameters.')
    }

    ResourcesService.getDeveloper(id)
      .then((dev) => {
        if (dev) {
          setDeveloper(dev)
        } else {
          console.error(`Developer with id ${id} not found`)
        }
      })
      .catch((error) => {
        console.error('Failed to fetch developers', error)
      })
  }, [])
  return (
    <>
      <Helmet>
        <title>{`Developer: ${developer.name}`}</title>
      </Helmet>
      <h1 className="text-1xl font-bold leading-tight p-3 m-2">
        {developer.name} {editMode ? ' (Edit mode)' : ''}
      </h1>
      <DeveloperCard developer={developer} modules={modules} editMode={editMode}></DeveloperCard>
      <span>{developer.name}</span>
    </>
  )
}
