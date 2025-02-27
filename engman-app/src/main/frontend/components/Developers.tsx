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

    const dialogOpened = useSignal(false);
    const [viewedDeveloper,setViewedDeveloper] = useState<DeveloperM | null>(null);

    const handleDeveloperView = (developer: DeveloperM) => {
        setViewedDeveloper(developer);
        dialogOpened.value = true;
    }
    const anchorStyle = {
        textDecoration: 'none',
        color: 'var(--lumo-primary-text-color)',
      };

    return (
      <>
        {title && <b className="subTitle">{title}</b>}
        <Grid items={developers}>
          <GridColumn
            header={'Avatar'}
            renderer={({ item }) => (
              <>
                <DeveloperAvatar developer={item} onDeveloperView={handleDeveloperView} />
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
          opened={dialogOpened.value}
          onOpenedChanged={({ detail }) => {
            dialogOpened.value = detail.value;
          }}
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

            {/* <Details summary="Customers" opened>
                <VerticalLayout>
                    <a href="#" style={anchorStyle}>
                    Accounts
                    </a>
                    <a href="#" style={anchorStyle}>
                    Contacts
                    </a>
                </VerticalLayout>
            </Details> */}
          </VerticalLayout>

        </Dialog>

        <Button
          onClick={() => {
            dialogOpened.value = true;
          }}>
          Show dialog
        </Button>
      </>
    );
}