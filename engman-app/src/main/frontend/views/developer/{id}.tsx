import DeveloperCard from 'Frontend/components/cards/DeveloperCard'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'
import React, { useEffect, useState } from 'react'
import { ResourcesService } from 'Frontend/generated/endpoints'
import DeveloperM from 'Frontend/generated/com/engman/models/DeveloperM'

export default function ProductDetail() {
  const [developer, setDeveloper] = useState<DeveloperM>({})
  const { id } = useParams()
  useEffect(() => {
    ResourcesService.getDevelopers()
      .then((devs) => {
        const dev = devs.find((dev: DeveloperM) => dev.id === id) // TODO: Find on server side
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
      <h1 className="text-1xl font-bold leading-tight p-3 m-2">{developer.name}</h1>
      <DeveloperCard developer={developer}></DeveloperCard>
    </>
  )
}
