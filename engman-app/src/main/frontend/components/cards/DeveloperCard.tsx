import DeveloperM from 'Frontend/generated/com/engman/models/DeveloperM'
import { Details, TextField, VerticalLayout } from '@vaadin/react-components'
import DeveloperAvatar from '../DeveloperAvatar'
import ModuleInfoM from 'Frontend/generated/com/engman/models/ModuleInfoM'
import { useState } from 'react'

interface Props {
  developer: DeveloperM
  modules: ModuleInfoM[]
  editMode?: boolean
  onDeveloperUpdate?: (developer: DeveloperM) => void
}

export default function DeveloperCard({ developer, modules, editMode = false, onDeveloperUpdate }: Props) {
  if (!modules) {
    throw new Error('Modules are required for DeveloperCard')
  }

  const [devName, setDevName] = useState<string>(developer.name ?? '')

  const getDistinctFieldModules = (developer: DeveloperM, allModules: ModuleInfoM[]): string[] => {
    const moduleSet = new Set<string>()
    if (developer.fields) {
      Object.values(developer.fields).forEach((field) => {
        if (field?.ownerModuleName) {
          moduleSet.add(field.ownerModuleName)
        }
      })
    }
    const moduleList = Array.from(moduleSet)
    return moduleList.sort((a: string, b: string) => {
      const aModule = allModules.find((m) => m.name === a)
      const bModule = allModules.find((m) => m.name === b)
      const aEnabled = aModule?.enabled ?? false
      const bEnabled = bModule?.enabled ?? false

      // Enabled modules first
      return Number(bEnabled) - Number(aEnabled)
    })
  }

  const isModuleEnabled = (moduleName: string): boolean => {
    const module = modules.find((m) => m.name === moduleName)
    return module ? module.enabled : false
  }

  const handleSaveDeveloper = () => {
    if (onDeveloperUpdate) {
      const updatedDeveloper = { ...developer, name: devName }
      onDeveloperUpdate(updatedDeveloper)
    }
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
                      <div style={{ display: 'flex', justifyContent: 'space-between' }} key={key}>
                        <span style={{ width: '200px' }}>
                          <b>{key}</b>
                        </span>
                        {/* {editMode ? <input type="text" value={devName} title="value" /> : <span>{value}</span>} */}
                        <span>{value}</span>
                      </div>
                    )
                )}
            </VerticalLayout>
          </Details>

          {/* Fields by Module */}
          {developer && (
            <>
              {getDistinctFieldModules(developer, modules).map((moduleName) => {
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
      {editMode && (
        <div>
          <TextField label="Name" value={devName} onChange={(e) => setDevName(e.target.value)} />
          <button onClick={handleSaveDeveloper}>Save</button>
        </div>
      )}
      <span>{developer.name}</span>
    </div>
  )
}
