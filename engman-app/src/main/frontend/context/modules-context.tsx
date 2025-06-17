import { createContext, useContext, useEffect, useState } from 'react'
import ModuleInfoM from 'Frontend/generated/com/engman/models/ModuleInfoM'
import { ModuleService } from 'Frontend/generated/endpoints'

interface ModulesContextProps {
  modules: ModuleInfoM[]
  setModules: (mods: ModuleInfoM[]) => void
  //  toggleModule: (mod: ModuleInfoM) => void
  toggleEnable: (moduleName: string, value: boolean) => Promise<ModuleInfoM[]>
  refreshModules: () => void
}

const ModulesContext = createContext<ModulesContextProps | undefined>(undefined)

export function ModulesProvider({ children }: { children: React.ReactNode }) {
  const [modules, setModules] = useState<ModuleInfoM[]>([])

  const refreshModules = () => {
    ModuleService.getModuleInfo()
      .then((mods) => {
        setModules(mods)
      })
      .catch((error) => {
        console.error('Failed to fetch modules', error)
      })
  }
  const toggleEnable = (moduleName: string, value: boolean): Promise<ModuleInfoM[]> => {
    return ModuleService.toggleEnable(moduleName ?? '', value)
      .then((modules) => {
        setModules(modules)
        return modules
      })
      .catch((error) => {
        console.error(`Failed to toggle module ${moduleName}`, error)
        throw error
      })
  }

  useEffect(() => {
    refreshModules()
  }, [])

  return (
    <ModulesContext.Provider value={{ modules, setModules, toggleEnable, refreshModules }}>
      {children}
    </ModulesContext.Provider>
  )
}

export function useModules() {
  const ctx = useContext(ModulesContext)
  if (!ctx) {
    throw new Error('useModules must be used inside a ModulesProvider')
  }
  return ctx
}
