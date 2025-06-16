import DeveloperCard from 'Frontend/components/cards/DeveloperCard'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'
import React, { useEffect, useState } from 'react'
import { ResourcesService } from 'Frontend/generated/endpoints'
import DeveloperM from 'Frontend/generated/com/engman/models/DeveloperM'

export default function ProductDetail() {
  const [developer, setDeveloper] = useState<DeveloperM>({})
  const { id } = useParams<{ id: string }>()
  if (!id) {
    console.error('Developer ID is not provided in the URL parameters.')
    return <div>Error: Developer ID is missing.</div>
  }
  useEffect(() => {
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
      <h1 className="text-1xl font-bold leading-tight p-3 m-2">{developer.name}</h1>
      <DeveloperCard developer={developer}></DeveloperCard>
    </>
  )
}
