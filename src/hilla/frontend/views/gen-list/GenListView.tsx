import {useEffect, useState} from 'react';
import {Grid} from "@hilla/react-components/Grid";
import {GridColumn} from "@hilla/react-components/GridColumn";
import { ResourcesService } from "Frontend/generated/endpoints";
import { useLocation } from 'react-router-dom';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

// interface GenListViewProps {
//     entityName: string;
// }
interface GenericEntity{    //TODO:move to core
    name: string;
    desc: string;
}

function getRandomEntities(entityName:string): GenericEntity[] {
    const getRandomString = (length: number) => Math.random().toString(36).substring(2, 2 + length);
    
    return Array.from({ length: 10 }, (_, index) => ({
        name: `${entityName} ${index + 1}`.padStart(3, '0'),
        desc: getRandomString(20) + " " + getRandomString(20)
    }));
}
export default function GenListView() {
    debugger;
    const entityName = useQuery().get('e');
    if (!entityName) throw new Error("entityName cannot be null or empty");
    
    const [entities] = useState(getRandomEntities(entityName));
    return (
        <>
            <h1>{entityName}</h1>
            <Grid items={entities}>
                <GridColumn path="name" />
                <GridColumn path="desc"/>
            </Grid>
        </>
    );
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
