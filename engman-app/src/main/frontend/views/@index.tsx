import Developers from 'Frontend/components/Developers';
import Slider from 'Frontend/components/Slider';
import { useEffect, useState } from 'react';
import { ResourcesService } from 'Frontend/generated/endpoints';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import Projects from 'Frontend/components/Projects';
import Flow from 'Frontend/components/Flow';

export default function DashboardView() {
    const [overallBudget, setOverallBudget] = useState<number>(100000);
    const [developers, setDevelopers] = useState<any[]>([]);        //TODO: MAke it type specific.
    const [projects, setProjects] = useState<any[]>([]);
    const [maxTime] = useState<number>(12);

    

  useEffect(() => {
        ResourcesService.getProjects().then(p=>{
            console.log("Projects",p);
            setProjects(p);
        })
        ResourcesService.getDevelopers().then(devs=>{
            console.log("Devs",devs);
            //initialDevelopers = devs;
            setDevelopers(devs);
        })
        .catch(error => {
            console.error("Failed to fetch developers", error);
        });
    }, []);

    const calculateBudget = (time:number) => {
        setOverallBudget(100000 - time*10000);
    }   
    const onTimeChange = (time:number) => {
        console.log("time changed to: ", time);
        calculateBudget(time);
        setDevelopers(developers.map(dev => (
            {...dev, 
                Age: dev.Age ?? 0 + time,
                Description: "new desc",
                SkillLevels: dev.SkillLevels?.map((skillLevel: any) => (
                    {...skillLevel, KnowledgePerc: skillLevel.KnowledgePerc + time/20}
                ))
            }
        )));
    }

    return (
        <>
            <h1>Dashboard</h1>
            
            <HorizontalLayout theme="padding spacing">
                <div className="example-item p-2" style={{ border:'1px solid lightgray', height:300, width:'50%', overflowY:'auto' }}>
                    <Developers developers={developers} title="Developers" showProgressBars={false} />
                </div>
                <div className="example-item p-2" style={{ border:'1px solid lightgray', width:'50%'  }}>
                    <div>
                        <h3><b>Projects</b></h3>
                        <Projects projects={projects} title="" showProgressBars={false} compactMode={true} />
                    </div>
                </div>
            </HorizontalLayout>

            <HorizontalLayout theme="padding spacing">
                <div className="example-item p-2" 
                     style={{ border:'1px solid lightgray', height:300, width:'50%' }}>
                        <Flow projects={projects} />
                </div>
                <div className="example-item p-2" style={{ border:'1px solid lightgray', width:'50%'  }}>Item 2</div>
            </HorizontalLayout>

            {/* <p>Overall Budget: {overallBudget}</p>
            <br />
            <Developers developers={developers} title="Developer" showProgressBars={true} /> */}

            <div style={{height:"30px",display:"block",backgroundColor:"white" }}></div>
            <Slider initialTime={0} maxTime={maxTime} onTimeChange={onTimeChange}/>
            <br/><br/><br/>
        </>
    );
}