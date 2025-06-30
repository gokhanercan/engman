import DeveloperM from 'Frontend/generated/com/engman/models/DeveloperM'
import { Avatar } from '@vaadin/react-components/Avatar.js'
import { ContextMenu } from '@vaadin/react-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Routes } from 'Frontend/utils/routes'

interface Props {
  developer: DeveloperM
  onDeveloperView?: (developer: DeveloperM) => void
  onDeveloperMouseOver?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, developer: DeveloperM) => Promise<void>
  onDeveloperMouseLeave?: (developer: DeveloperM) => Promise<void>
  developerDetailLink?: (id: string, edit: boolean) => string
}

export default function DeveloperAvatar({
  developer,
  onDeveloperView,
  onDeveloperMouseOver,
  onDeveloperMouseLeave,
  developerDetailLink,
}: Props) {
  const navigate = useNavigate()

  console.log('DeveloperAvatar: developer', developer)
  if (!('id' in developer) || developer.id === undefined || developer.id === null) {
    console.error('Developer ID is not defined or null.')
  }

  // Add 'disabled' property to items as needed
  const ctxItems = [
    { text: 'Detail', disabled: !developerDetailLink },
    { text: 'Edit', disabled: !developerDetailLink },
    { text: 'Delete', disabled: true },
  ]

  const handleContextMenu = (e: any) => {
    if (e.detail.value.text === 'Detail') {
      const devName = e.target.querySelector('div').getAttribute('dev-name')
      if (developerDetailLink) navigate(developerDetailLink(developer.id ?? '', false))
    } else if (e.detail.value.text === 'Edit') {
      if (developerDetailLink) navigate(developerDetailLink(developer.id ?? '', true))
    } else if (e.detail.value.text === 'Delete') {
      console.log('Delete action is disabled.')
    } else {
      console.log('Not implemented Action: ', e.detail.value.text)
    }
  }

  //todo:rename.
  const handleMouseLeave = async (e: any, developer: DeveloperM) => {
    if (onDeveloperMouseLeave) {
      await onDeveloperMouseLeave(developer)
    }
  }
  const handleMouseOver = async (e: any, developer: DeveloperM) => {
    if (onDeveloperMouseOver) {
      await onDeveloperMouseOver(e, developer)
    }
  }

  return (
    <>
      <ContextMenu items={ctxItems} onItemSelected={handleContextMenu}>
        <div
          className=""
          dev-name={developer.name}
          style={{ width: '36px', height: '38px' }}
          onClick={() => onDeveloperView && onDeveloperView(developer)}
          onMouseOver={(e) => handleMouseOver(e, developer)}
          onMouseLeave={(e) => handleMouseLeave(e, developer)}
        >
          <Avatar name={`${developer.name}`} />
        </div>
      </ContextMenu>
    </>
  )
}
