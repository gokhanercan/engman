import { Checkbox, Grid, GridColumn } from '@vaadin/react-components';
// import { Suspense, useEffect } from 'react';

interface ModulesMenuProps {
    modules: any[];
}

export default function ModulesMenu({modules}: ModulesMenuProps) {
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
                             <Checkbox checked={item.enabled} label="" />
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
                {/* <GridColumn path="name" header="Name" width="200px" className="text-blue-500! font-bold!" /> */}
            </Grid>
          </div>
    );
}