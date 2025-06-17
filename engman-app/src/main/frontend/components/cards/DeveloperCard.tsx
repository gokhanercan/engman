import DeveloperM from 'Frontend/generated/com/engman/models/DeveloperM'
import { Details, VerticalLayout } from '@vaadin/react-components'
import DeveloperAvatar from '../DeveloperAvatar'
import { useModules } from 'Frontend/context/modules-context'

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
  const isModuleEnabled = (moduleName: string): boolean => {
    const module = modules.find((m) => m.name === moduleName)
    return module ? module.enabled : false
  }

  const { modules } = useModules()
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
              {getDistinctFieldModules(developer).map((moduleName) => {
                const moduleFields = Object.entries(developer.fields || {}).filter(
                  ([_, field]) => field?.ownerModuleName === moduleName
                )
                const isEnabled = isModuleEnabled(moduleName)
                return (
                  <Details
                    key={moduleName}
                    summary={isEnabled ? moduleName : `${moduleName} (Disabled)`}
                    className={isEnabled ? '' : 'em-disabled'}
                    opened
                  >
                    <VerticalLayout>
                      {moduleFields.map(([fieldName, field]) => (
                        <div
                          key={fieldName}
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                          className={isEnabled ? '' : 'strikethrough'}
                        >
                          <span style={{ width: '200px' }}>{field?.name}</span>
                          <span>{field?.value}</span>
                        </div>
                      ))}
                    </VerticalLayout>
                  </Details>
                )
              })}
            </>
          )}
        </div>
      </VerticalLayout>
    </div>
  )
}
