import { Checkbox, Grid, GridColumn } from '@vaadin/react-components';
import ModuleInfoM from 'Frontend/generated/com/engman/models/ModuleInfoM';

interface ModulesMenuProps {
    modules: ModuleInfoM[];
    onModuleEnable: (module: ModuleInfoM, checked: boolean) => void;
    //TODO:onModuleInstalled, onModuleDisabled... onModuleActivated..
}

export default function ModulesMenu({modules, onModuleEnable}: ModulesMenuProps) {
    console.log("Modules",modules);    
    return (
        <div>
            <span className='text-lg font-semibold mb-2 mt-2 block'>Modules</span>
            <Grid items={modules} theme="compact" className='bg-opacity-50 bg-gray-100'>
                <GridColumn
                    header={""}
                    width="30px"
                    renderer={({ item }) => (
                        <>
                             <Checkbox
                                 checked={item.enabled}
                                 label=""
                                 onCheckedChanged={(e) => onModuleEnable(item, e.detail.value)}
                             />
                        </>
                    )}
                />
                <GridColumn
                    header={"Name"}
                    width=""
                    renderer={({ item }) => (
                        <>
                             <span className={item.enabled ? "" : "em-disabled"}>{item.name}</span>
                        </>
                    )}
                />
            </Grid>
          </div>
    );
}