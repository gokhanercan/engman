import Developers from 'Frontend/components/Developers'
import Slider from 'Frontend/components/Slider'
import { useEffect, useState } from 'react'
import { ResourcesService } from 'Frontend/generated/endpoints'
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js'
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js'
import Projects from 'Frontend/components/Projects'
import Flow from 'Frontend/components/Flow'
import Skills from 'Frontend/components/Skills'
import SkillLevelM from 'Frontend/generated/com/engman/models/SkillLevelM'
import SkillM from 'Frontend/generated/com/engman/models/SkillM'
import { Icon } from '@vaadin/react-components'
import { Helmet } from 'react-helmet'
import { Routes } from 'Frontend/utils/routes'
import { Link } from 'react-router-dom'
import { useModules } from 'Frontend/context/modules-context'
import { m } from '@vaadin/hilla-lit-form'

export default function DashboardView() {
  const [overallBudget, setOverallBudget] = useState<number>(100000)
  const [developers, setDevelopers] = useState<any[]>([]) //TODO: MAke it type specific.
  const [skills, setSkills] = useState<SkillM[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [maxTime] = useState<number>(12)
  const { modules } = useModules()
  useEffect(() => {
    ResourcesService.getProjects().then((ps) => {
      setProjects(ps)
    })
    ResourcesService.getDevelopers().then((devs) => {
      //initialDevelopers = devs;
      setDevelopers(devs)
    })
    ResourcesService.getSkills()
      .then((skills) => {
        setSkills(skills)
      })
      .catch((error) => {
        console.error('Failed to fetch developers', error)
      })
  }, [])

  const calculateBudget = (time: number) => {
    setOverallBudget(100000 - time * 10000)
  }
  const onTimeChange = (time: number) => {
    console.log('time changed to: ', time)
    calculateBudget(time)
    setDevelopers(
      developers.map((dev) => ({
        ...dev,
        Age: dev.Age ?? 0 + time,
        Description: 'new desc',
        SkillLevels: dev.SkillLevels?.map((skillLevel: any) => ({
          ...skillLevel,
          KnowledgePerc: skillLevel.KnowledgePerc + time / 20,
        })),
      }))
    )
  }

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <HorizontalLayout theme="paddingx spacingx" className="p-3 gap-3">
        <div className="block">
          <div className="link">
            <Link to={Routes.developers()}>
              <Icon icon="vaadin:external-link" style={{ padding: '0.25em' }} />
            </Link>
          </div>
          <Developers
            developers={developers}
            title="Developers"
            showProgressBars={false}
            developersLink={Routes.developers}
            developerDetailLink={Routes.developerDetailLink}
            showModuleFields={false}
            modules={modules}
          />
        </div>
        <div className="block" style={{ borderxxx: '1px solid lightgray', widthxx: '50%' }}>
          <div>
            <div className="link">
              <a href="/projects">
                <Icon icon="vaadin:external-link" style={{ padding: '0.25em' }} />
              </a>
            </div>
            <Projects projects={projects} title="Projects" showProgressBars={false} compactMode={true} />
          </div>
        </div>
      </HorizontalLayout>

      <HorizontalLayout theme="paddingx spacingx" className="p-3 gap-3">
        {/* Flow */}
        <div className="block">
          <div className="link">
            <a href="/flow">
              <Icon icon="vaadin:expand" style={{ padding: '0.25em' }} />
            </a>
          </div>
          <Flow projects={projects} />
        </div>

        {/* Skills */}
        <div className="block">
          <div>
            <div className="link">
              <a href="/skills">
                <Icon icon="vaadin:external-link" style={{ padding: '0.25em' }} />
              </a>
            </div>
            <Skills skills={skills} title={'Skills'}></Skills>
          </div>
        </div>
      </HorizontalLayout>

      {/* <p>Overall Budget: {overallBudget}</p>
            <br />
            <Developers developers={developers} title="Developer" showProgressBars={true} /> */}

      <div style={{ height: '30px', display: 'block', backgroundColor: 'white' }}></div>
      <Slider initialTime={0} maxTime={maxTime} onTimeChange={onTimeChange} />
      <br />
      <br />
      <br />
    </>
  )
}
