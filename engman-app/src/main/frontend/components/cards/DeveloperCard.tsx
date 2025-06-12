import DeveloperM from 'Frontend/generated/com/engman/models/DeveloperM'
import Developer from './../../views/developer'
import { Button, Details, Dialog, Icon, VerticalLayout } from '@vaadin/react-components'
import DeveloperAvatar from '../DeveloperAvatar'

interface DeveloperCardProps {
  developer: DeveloperM
}

export default function DeveloperCard({ developer }: DeveloperCardProps) {
  const getDistinctFieldModules = (developer: DeveloperM): string[] => {
    const modules = new Set<string>()
    if (developer.fields) {
      Object.values(developer.fields).forEach((field) => {
        if (field && field.ownerModuleName) {
          modules.add(field.ownerModuleName)
        }
      })
    }
    return Array.from(modules)
  }

  return (
    <div className="card inline-block">
      <div className="float-right inline border1">
        <DeveloperAvatar developer={developer} />
      </div>
      <VerticalLayout
        className="border1 border-red-300 inline"
        style={{ alignItems: 'stretch', width: '40rem', maxWidth: '100%' }}
      >
        <div className="float-left inline">
          {/* info */}
          <Details summary="Core" className="inline" opened>
            <VerticalLayout>
              {developer &&
                Object.entries(developer).map(
                  ([key, value]) =>
                    (typeof value === 'string' || typeof value === 'number') && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ width: '200px' }}>
                          <b>{key}</b>
                        </span>
                        <span>{value}</span>
                      </div>
                    )
                )}
            </VerticalLayout>
          </Details>

          {/* Fields by Module */}
          {developer && (
            <>
              {getDistinctFieldModules(developer).map((moduleName) => (
                <Details key={moduleName} summary={moduleName} opened>
                  <VerticalLayout>
                    {Object.entries(developer.fields || {})
                      .filter(([_, field]) => field?.ownerModuleName === moduleName)
                      .map(([fieldName, field]) => (
                        <div key={fieldName} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ width: '200px' }}>{field?.name}</span>
                          <span>{field?.value}</span>
                        </div>
                      ))}
                  </VerticalLayout>
                </Details>
              ))}
            </>
          )}
        </div>
      </VerticalLayout>
    </div>
  )
}
