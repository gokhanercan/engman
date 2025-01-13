import React, { useEffect, useState } from "react";
import { ResourcesService } from "Frontend/generated/endpoints";
import Developers from "Frontend/components/Developers";
import DeveloperM from "Frontend/generated/com/engman/models/DeveloperM";

export default function DevelopersView() {
    // const initialDevelopers: DeveloperM[] = [ 
    //     {"Name": "Gokhan", "Age": 25, "Skills": 
    //         [{"Name": "Java", "Description": "Java programming language"}, {"Name": "C#", "Description": "C# programming language"}]},
    //     {"Name": "John Doe2", "Age": 35},
    // ]
    const [developers,setDevelopers] = useState<DeveloperM[]>([]);

    useEffect(() => {
        ResourcesService.getDevelopers().then(devs=>{
            console.log("Devs",devs);
            setDevelopers(devs);
        })
        .catch(error => {
            console.error("Failed to fetch developers", error);
        });
    }, []);

    return (
        <>
            <Developers developers={developers} title='Developers' showProgressBars={false}  />
        </>
    );
}