import { Grid } from "@vaadin/react-components/Grid.js";
import { GridColumn } from "@vaadin/react-components/GridColumn.js";
import DeveloperM from "Frontend/generated/com/engman/models/DeveloperM";
import Skills from "./SkillsBadges";
import DeveloperAvatar from "./DeveloperAvatar";
import { Button, Details, Dialog, Icon, VerticalLayout } from "@vaadin/react-components";
import { useSignal } from "@vaadin/hilla-react-signals";
import { useState } from "react";

interface DeveloperCompProps {
    developers: DeveloperM[] | null;
    title?: string | null;
    showProgressBars?: boolean;
    pageLink?: string | null;
}

export default function Developers({ developers,title,showProgressBars=true,pageLink}: DeveloperCompProps) {
    const [dialogOpened,setDialogOpened] = useState<boolean>(false);
    const [dialogPosition,setDialogPosition] = useState<any>({});
    const [viewedDeveloper,setViewedDeveloper] = useState<DeveloperM | null>(null);

    const handleDeveloperView = async (developer: DeveloperM,e?:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setViewedDeveloper(developer);  
        setDialogOpened(true);
        console.log("VDev",developer);
        //if(e) setDialogPosition({ x: e.clientX , y: e.clientY });
    }
    const handleDeveloperViewClose = async () => {
        setViewedDeveloper(null);
        setDialogOpened(false);
        //setDialogPosition({});
    }
    const handleDialogOpenedChanged = (value:boolean) => {
        setDialogOpened(value);
        if(!value){
          setViewedDeveloper(null);
        }
    }
    const anchorStyle = {
        textDecoration: 'none',
        color: 'var(--lumo-primary-text-color)',
      };

    return (
      <>
        {title && <b className="subTitle">{title}</b>}
        {/* <span>Selected: {dialogPosition.x}</span> */}
        {/* <span>D Open: {`${dialogOpened}`}</span> */}
        <Grid items={developers} theme="row-stripes"  > 
          <GridColumn
            header={'Avatar'}
            renderer={({ item }) => (
              <>
                <DeveloperAvatar developer={item} 
                  onDeveloperView={(developer)=> handleDeveloperView(developer,undefined)}
                  //onDeveloperMouseOver={async(e,developer) => {handleDeveloperView(developer,e);}}
                  //onDeveloperMouseLeave={(developer) => handleDeveloperViewClose() }
                  />
              </>
            )}
          />
          <GridColumn path="name" header="Name" />
          <GridColumn
            header={'Skills'}
            renderer={({ item }) => (
              <Skills
                requiredSkills={item.skillLevels}
                showLevels={true}
                showLevelInProgress={showProgressBars}
                showVertical={false}></Skills>
            )}
          />
        </Grid>

        <Dialog
          headerTitle={viewedDeveloper?.name}
          opened={dialogOpened}
          onOpenedChanged={({ detail }) => {
            handleDialogOpenedChanged(detail.value);
          }}
          // modeless
          // top={`${dialogPosition.y}px`}
          // left={`${dialogPosition.x}px`}
          footer={
            <>
            </>
          }>
          <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
            
            {/* info */}
            <Details summary="Analytics" opened>
                <VerticalLayout>
                {viewedDeveloper && Object.entries(viewedDeveloper).map(([key, value]) => 
                    (
                    (typeof value === "string" || typeof value === "number") &&
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{width:'100px' }}>{key}</span>
                        <span>{value}</span>
                    </div>
                    )
                )}
                </VerticalLayout>
            </Details>

            <Details summary="Other Fields" opened>
                <VerticalLayout>
                  
              {/* <span>{viewedDeveloper?.MInfo?.[0].ModuleName}</span> */}

                  {viewedDeveloper?.MInfo && viewedDeveloper.MInfo.map((m, index) => (
                    <div key={index} style={{ display: 'flex1', justifyContent: 'space-between' }}>
                      <b>
                        <span style={{width:'100px'}}>{m.ModuleName}</span>
                      </b>
                      <hr/>
                      <div>
                        {m.Fields?.map((f, index) => (
                          <div key={index} >
                            {Object.entries(f).map(([key, value]) => (
                              <div key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{width:'100px' }}>{key}</span>
                                <span>{value}</span>
                              </div>
                            ))}
                          </div>
                      ))}</div>
                    </div>
                  ))}
                </VerticalLayout>
            </Details>
          </VerticalLayout>

        </Dialog>
      </>
    );
}