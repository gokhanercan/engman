import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import DeveloperM from 'Frontend/generated/com/engman/models/DeveloperM';
import Skills from './SkillsBadges';
import DeveloperAvatar from './DeveloperAvatar';
import { Button, Details, Dialog, Icon, VerticalLayout } from '@vaadin/react-components';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useState } from 'react';

interface DevelopersCompProps {
  developers: DeveloperM[] | null;
  title?: string | null;
  showProgressBars?: boolean;
  pageLink?: string | null;
  detailPageLinkFormat?: string | null;
}

export default function Developers({
  developers,
  title,
  showProgressBars = true,
  pageLink,
  detailPageLinkFormat,
}: DevelopersCompProps) {
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [dialogPosition, setDialogPosition] = useState<any>({});
  const [viewedDeveloper, setViewedDeveloper] = useState<DeveloperM | null>(null);

  const handleDeveloperView = async (developer: DeveloperM, e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setViewedDeveloper(developer);
    setDialogOpened(true);
    console.log('VDev', developer);
    //if(e) setDialogPosition({ x: e.clientX , y: e.clientY });
  };
  const handleDeveloperViewClose = async () => {
    setViewedDeveloper(null);
    setDialogOpened(false);
    //setDialogPosition({});
  };
  const handleDialogOpenedChanged = (value: boolean) => {
    setDialogOpened(value);
    if (!value) {
      setViewedDeveloper(null);
    }
  };
  const anchorStyle = {
    textDecoration: 'none',
    color: 'var(--lumo-primary-text-color)',
  };

  const getDistinctFieldModules = (developer: DeveloperM): string[] => {
    const modules = new Set<string>();
    if (developer.fields) {
      Object.values(developer.fields).forEach((field) => {
        if (field && field.ownerModuleName) {
          modules.add(field.ownerModuleName);
        }
      });
    }
    return Array.from(modules);
  };

  return (
    <>
      {title && <b className="subTitle">{title}</b>}
      {/* <span>Selected: {dialogPosition.x}</span> */}
      {/* <span>D Open: {`${dialogOpened}`}</span> */}
      <Grid items={developers} theme="row-stripes">
        <GridColumn
          header={'Avatar'}
          renderer={({ item }) => (
            <>
              <DeveloperAvatar
                developer={item}
                onDeveloperView={(developer) => handleDeveloperView(developer, undefined)}
                //onDeveloperMouseOver={async(e,developer) => {handleDeveloperView(developer,e);}}
                //onDeveloperMouseLeave={(developer) => handleDeveloperViewClose() }
              />
            </>
          )}
        />
        {/* <GridColumn path="name" header="Name" /> */}

        <GridColumn
          header="Name"
          renderer={({ item }) =>
            detailPageLinkFormat ? (
              <a href={detailPageLinkFormat.replace('{id}', item.id)}>
                <span>{item.name}</span>
              </a>
            ) : (
              <span>{item.name}</span>
            )
          }
        />

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
        footer={<></>}>
        <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
          {/* info */}
          <Details summary="Core" opened>
            <VerticalLayout>
              {viewedDeveloper &&
                Object.entries(viewedDeveloper).map(
                  ([key, value]) =>
                    (typeof value === 'string' || typeof value === 'number') && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ width: '100px' }}>{key}</span>
                        <span>{value}</span>
                      </div>
                    ),
                )}
            </VerticalLayout>
          </Details>

          {/* Fields by Module */}
          {viewedDeveloper && (
            <>
              {getDistinctFieldModules(viewedDeveloper).map((moduleName) => (
                <Details key={moduleName} summary={moduleName} opened>
                  <VerticalLayout>
                    {Object.entries(viewedDeveloper.fields || {})
                      .filter(([_, field]) => field?.ownerModuleName === moduleName)
                      .map(([fieldName, field]) => (
                        <div key={fieldName} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ width: '200px' }}>{field?.name}</span>
                          <span>{field?.value}</span>
                        </div>
                      ))}
                  </VerticalLayout>
                </Details>
              ))}
            </>
          )}

          {/* Skills */}
        </VerticalLayout>
      </Dialog>
    </>
  );
}
