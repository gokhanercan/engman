import DeveloperM from 'Frontend/generated/com/engman/models/DeveloperM'
import { Button, Details, TextField, VerticalLayout } from '@vaadin/react-components'
import DeveloperAvatar from '../DeveloperAvatar'
import ModuleInfoM from 'Frontend/generated/com/engman/models/ModuleInfoM'
import { useEffect, useState } from 'react'
import { isEqual } from 'lodash'

interface Props {
  developer: DeveloperM
  modules: ModuleInfoM[]
  editMode?: boolean
  onDeveloperUpdate?: (developer: DeveloperM) => void
}

export default function DeveloperCard({ developer, modules, editMode = false, onDeveloperUpdate }: Props) {
  if (!modules || !Array.isArray(modules)) {
    console.error('DeveloperCard: "modules" prop is required and must be an array.')
    return null
  }

  const effEditMode = editMode && onDeveloperUpdate !== undefined
  const [localDev, setLocalDev] = useState<DeveloperM>(developer)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setLocalDev(developer)
  }, [developer])

  useEffect(() => {
    setHasChanges(!isEqual(localDev, developer))
  }, [localDev, developer])

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
      onDeveloperUpdate(localDev)
      console.log('Developer saved:', localDev)
    }
  }

  const handleFieldChange = (fieldName: string, value: string) => {
    setLocalDev((prevDeveloper) => ({
      ...prevDeveloper,
      [fieldName]: value,
    }))
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
                        {effEditMode && key != 'id' ? (
                          <TextField
                            value={(localDev as Record<string, any>)[key]?.toString() || ''}
                            onChange={(e) => handleFieldChange(key, e.target.value)}
                            // onKeyDown={handleKeyDown}
                          />
                        ) : (
                          <span>{value}</span>
                        )}
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

          {/* Edit Actions */}
          {effEditMode && (
            <div className="p-16 border border-gray-300 rounded w-full ">
              <Button theme="primary" onClick={handleSaveDeveloper} disabled={!hasChanges}>
                Save
              </Button>
              <p>Updated name: {localDev.name}</p>
            </div>
          )}
        </div>
      </VerticalLayout>
    </div>
  )
}
