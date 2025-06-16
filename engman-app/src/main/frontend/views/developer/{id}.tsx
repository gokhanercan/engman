// tag::snippet[]
import { useParams } from 'react-router'
// end::snippet[]

export default function ProductView() {
  // tag::snippet[]
  const { productId } = useParams()
  1
  // end::snippet[]

  return (
    <>
      <h1>Product Details</h1>
      <p>Product ID: {productId}</p>
    </>
  )
}

// src/views/developer/[id].tsx
// import { useRouteParameters } from '@vaadin/hilla-react-router';

// export default function DeveloperPage() {
//   // const { id } = useRouteParameters();
//   return <div>Developer ID: </div>
// }

// import React, { useEffect, useState } from 'react'
// import { ResourcesService } from 'Frontend/generated/endpoints'
// import Developers from 'Frontend/components/Developers'
// import DeveloperM from 'Frontend/generated/com/engman/models/DeveloperM'
// import { Helmet } from 'react-helmet'
// import DeveloperCard from 'Frontend/components/cards/DeveloperCard'
// // import { useRouteParameters } from '@vaadin/react-router'
// export default function Developer() {
//   const [developer, setDeveloper] = useState<DeveloperM>({})

//   // const { id } = useRouteParameters();

//   // useEffect(() => {
//   //   ResourcesService.getDevelopers()
//   //     .then((devs) => {
//   //       setDeveloper(devs[0]) // TODO: Query by ID
//   //     })
//   //     .catch((error) => {
//   //       console.error('Failed to fetch developers', error)
//   //     })
//   // }, [])

//   return (
//     <>
//       {/* <Helmet>
//         <title>Developer: {developer.name}</title>
//       </Helmet> */}
//       <h1 className="text-1xl font-bold leading-tight p-3 m-2">{developer.name}</h1>
//       <DeveloperCard developer={developer}></DeveloperCard>
//     </>
//   )
// }
