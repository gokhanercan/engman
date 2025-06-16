import { Checkbox, CheckboxChangeEvent, Grid, GridColumn } from '@vaadin/react-components'
import ModuleInfoM from 'Frontend/generated/com/engman/models/ModuleInfoM'
import { checker } from 'vite-plugin-checker'

interface ModulesMenuProps {
  modules: ModuleInfoM[]
  onModuleEnable: (module: ModuleInfoM, checked: boolean) => void
  //TODO:onModuleInstalled, onModuleDisabled... onModuleActivated..
}

export default function ModulesMenu({ modules, onModuleEnable }: ModulesMenuProps) {
  // const handleEnableChange = (e: CheckboxChangeEvent, item: ModuleInfoM) => {
  //     const isEnable = e.target.checked
  //     console.log("enable",isEnable);
  //     //onModuleEnable(item, isEnable);
  // }

  const handleEnableClick = (e: any, item: ModuleInfoM) => {
    e.preventDefault()
    onModuleEnable(item, !item.enabled)
  }
  return (
    <div>
      <span className="text-lg font-semibold">Modules</span>
      <Grid items={modules} theme="compact" className="bg-opacity-50 bg-gray-100">
        <GridColumn
          header={''}
          width="30px"
          renderer={({ item }) => (
            <>
              <Checkbox
                checked={item.enabled}
                label={item.name}
                disabled={false}
                className={item.enabled ? '' : 'em-disabled'}
                //  onChange={(e) => handleEnableChange(e, item)}
                onClick={(e) => handleEnableClick(e, item)}
              />
            </>
          )}
        />
        {/* <GridColumn
                    header={"Name"}
                    width=""
                    renderer={({ item }) => (
                        <>
                             <span className={`text-sm ${item.enabled ? "text-black" : "text-gray-500"}`}>{item.name}</span>
                        </>
                    )}
                /> */}
      </Grid>
    </div>
  )
}
