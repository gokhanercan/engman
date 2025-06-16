import React, { useEffect, useState } from 'react'
import { ResourcesService } from 'Frontend/generated/endpoints'
import Developers from 'Frontend/components/Developers'
import DeveloperM from 'Frontend/generated/com/engman/models/DeveloperM'
import { Helmet } from 'react-helmet'
import { Routes } from 'Frontend/utils/routes'

export default function DevelopersView() {
  // const [developers,setDevelopers] = useState<DeveloperM[]>([]);
  const [developers, setDevelopers] = useState<any>([])

  useEffect(() => {
    ResourcesService.getDevelopers()
      .then((devs) => {
        // console.log("Devs",devs);

        //TODO: Data Hack
        const colors = ['red', 'green', 'blue', 'yellow']
        // const devs2 = devs.map((dev: DeveloperM) => {
        //     const randomColor = colors[Math.floor(Math.random() * colors.length)];
        //     return { ...dev, MInfo: [
        //         { ModuleName: "TrueColors", Fields: [{ "TrueColor": randomColor }] },
        //         { ModuleName: "Scrum", Fields: [{ "Role": "ScrumMaster" }] },
        //         { ModuleName: "Kanban", Fields: [{ "NrOfItems": "2" }] }
        // ] };
        // });
        // console.log("Devs2",devs2);
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
      />
    </>
  )
}
