import { Grid } from '@vaadin/react-components/Grid.js'
import { GridColumn } from '@vaadin/react-components/GridColumn.js'
import DeveloperM from 'Frontend/generated/com/engman/models/DeveloperM'
import Skills from './SkillsBadges'
import DeveloperAvatar from './DeveloperAvatar'
import { Button, Details, Dialog, Icon, VerticalLayout } from '@vaadin/react-components'
import { useSignal } from '@vaadin/hilla-react-signals'
import { useState } from 'react'
import DeveloperCard from './cards/DeveloperCard'

interface DevelopersCompProps {
  developers: DeveloperM[] | null
  title?: string | null
  showProgressBars?: boolean
  pageLink?: string | null
  detailPageLinkFormat?: string | null
}

export default function Developers({
  developers,
  title,
  showProgressBars = true,
  pageLink,
  detailPageLinkFormat,
}: DevelopersCompProps) {
  const [dialogOpened, setDialogOpened] = useState<boolean>(false)
  const [dialogPosition, setDialogPosition] = useState<any>({})
  const [viewedDeveloper, setViewedDeveloper] = useState<DeveloperM | null>(null)

  const handleDeveloperView = async (developer: DeveloperM, e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setViewedDeveloper(developer)
    setDialogOpened(true)
    console.log('VDev', developer)
    //if(e) setDialogPosition({ x: e.clientX , y: e.clientY });
  }
  const handleDeveloperViewClose = async () => {
    setViewedDeveloper(null)
    setDialogOpened(false)
    //setDialogPosition({});
  }
  const handleDialogOpenedChanged = (value: boolean) => {
    setDialogOpened(value)
    if (!value) {
      setViewedDeveloper(null)
    }
  }
  const anchorStyle = {
    textDecoration: 'none',
    color: 'var(--lumo-primary-text-color)',
  }

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
              showVertical={false}
            ></Skills>
          )}
        />
      </Grid>

      <Dialog
        headerTitle={viewedDeveloper?.name}
        opened={dialogOpened}
        onOpenedChanged={({ detail }) => {
          handleDialogOpenedChanged(detail.value)
        }}
        // modeless
        // top={`${dialogPosition.y}px`}
        // left={`${dialogPosition.x}px`}
        footer={<></>}
      >
        {viewedDeveloper && <DeveloperCard developer={viewedDeveloper} />}
      </Dialog>
    </>
  )
}
