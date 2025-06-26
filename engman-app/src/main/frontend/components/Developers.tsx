import { Grid } from '@vaadin/react-components/Grid.js'
import { GridColumn } from '@vaadin/react-components/GridColumn.js'
import DeveloperM from 'Frontend/generated/com/engman/models/DeveloperM'
import Skills from './SkillsBadges'
import DeveloperAvatar from './DeveloperAvatar'
import { Dialog, GridColumnGroup, GridFilterColumn, GridSortColumn, TextField } from '@vaadin/react-components'
import { useState } from 'react'
import DeveloperCard from './cards/DeveloperCard'
import { Link } from 'react-router-dom'
import ModuleInfoM from 'Frontend/generated/com/engman/models/ModuleInfoM'
import { extractModuleName } from 'Frontend/models/moduleInfoExtensions'

interface DevelopersCompProps {
  developers: DeveloperM[] | null
  title?: string | null
  showProgressBars?: boolean
  developersLink?: () => string
  developerDetailLink?: (id: string, edit?: boolean) => string
  showModuleFields?: boolean
  modules: ModuleInfoM[]
}

export default function Developers({
  developers,
  title,
  showProgressBars = true,
  developersLink,
  developerDetailLink,
  showModuleFields = false,
  modules,
}: DevelopersCompProps) {
  const [dialogOpened, setDialogOpened] = useState<boolean>(false)
  const [dialogPosition, setDialogPosition] = useState<any>({})
  const [viewedDeveloper, setViewedDeveloper] = useState<DeveloperM | null>(null)

  function flattenDeveloperFields(developers: DeveloperM[]): any[] {
    return developers.map((dev) => {
      const flatFields: Record<any, any> = {}

      if (dev.fields) {
        Object.values(dev.fields).forEach((field) => {
          if (field?.name) {
            flatFields[`${field?.ownerModuleName}_${field?.name}`] = field.value
          }
        })
      }
      return {
        ...dev,
        ...flatFields,
      }
    })
  }

  if (developers == null) throw new Error('Developers should be provided!')
  const developers_flat = flattenDeveloperFields(developers)
  //console.log('DevelopersFlat', developers_flat)

  const handleDeveloperView = async (developer: DeveloperM, e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setViewedDeveloper(developer)
    setDialogOpened(true)
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

  const dynamicFieldKeys = ['DORA_CognitiveLoad', 'DORA_Happiness', 'TrueColors_TrueColor'] //TODO:

  const shouldRenderField = (fieldKey: string): boolean => {
    let moduleName = extractModuleName(fieldKey)
    if (modules.length > 0) {
      return modules.find((module) => module.name === moduleName)?.enabled === true
    } else {
      return false
    }
  }

  return (
    <>
      {title && (
        <Link to={developersLink ? developersLink() : ''}>
          <b className="subTitle">{title}</b>
        </Link>
      )}
      {/* <span>Selected: {dialogPosition.x}</span> */}
      {/* <span>D Open: {`${dialogOpened}`}</span> */}

      <Grid items={developers_flat} theme="row-stripes">
        <GridSortColumn
          header={'Avatar'}
          path="name"
          renderer={({ item }) => (
            <>
              <DeveloperAvatar
                developer={item}
                onDeveloperView={(developer) => handleDeveloperView(developer, undefined)}
                developerDetailLink={developerDetailLink}
                //onDeveloperMouseOver={async(e,developer) => {handleDeveloperView(developer,e);}}
                //onDeveloperMouseLeave={(developer) => handleDeveloperViewClose() }
              />
            </>
          )}
        />

        <GridFilterColumn
          header="Name"
          path="name"
          renderer={({ item }) =>
            developerDetailLink ? <Link to={developerDetailLink(item.id)}>{item.name}</Link> : <span>{item.name}</span>
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

        {showModuleFields && modules && (
          <GridColumnGroup header="Modules">
            {dynamicFieldKeys.map(
              (fieldKey) =>
                shouldRenderField(fieldKey) && (
                  <GridFilterColumn
                    key={fieldKey}
                    header={fieldKey.replace('_', ' ')}
                    path={`${fieldKey}`}
                    renderer={({ item }) => <span>{item.fields[fieldKey]?.value}</span>}
                    // TODO:Reset dynamic field filters (module fields) after module toggle operations.
                  />
                )
            )}
          </GridColumnGroup>
        )}
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
        {viewedDeveloper && <DeveloperCard developer={viewedDeveloper} modules={modules} />}
      </Dialog>
    </>
  )
}
