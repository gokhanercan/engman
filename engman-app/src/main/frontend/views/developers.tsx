import React, { useEffect, useState } from "react";
import { ResourcesService } from "Frontend/generated/endpoints";
import Developers from "Frontend/components/Developers";
import DeveloperM from "Frontend/generated/com/engman/models/DeveloperM";

export default function DevelopersView() {
    const [developers,setDevelopers] = useState<DeveloperM[]>([]);

    useEffect(() => {
        ResourcesService.getDevelopers().then(devs=>{
            //console.log("Devs",devs);
            setDevelopers(devs);
        })
        .catch(error => {
            console.error("Failed to fetch developers", error);
        });
    }, []);

    return (
        <>
            <Developers developers={developers} title='' showProgressBars={false}  />
        </>
    );
}