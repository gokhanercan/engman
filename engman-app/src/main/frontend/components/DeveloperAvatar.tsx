import DeveloperM from 'Frontend/generated/com/engman/models/DeveloperM'
import { Avatar } from '@vaadin/react-components/Avatar.js'
import { ContextMenu } from '@vaadin/react-components'
import { useState } from 'react'

interface DeveloperAvatarProps {
  developer: DeveloperM
  onDeveloperView?: (developer: DeveloperM) => void
  onDeveloperMouseOver?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, developer: DeveloperM) => Promise<void>
  onDeveloperMouseLeave?: (developer: DeveloperM) => Promise<void>
}

export default function DeveloperAvatar({
  developer,
  onDeveloperView,
  onDeveloperMouseOver,
  onDeveloperMouseLeave,
}: DeveloperAvatarProps) {
  // Add 'disabled' property to items as needed
  const ctxItems = [
    { text: 'View', disabled: false },
    { text: 'Edit', disabled: true },
    { text: 'Delete', disabled: true },
  ]

  const handleContextMenu = (e: any) => {
    if (e.detail.value.text === 'View') {
      const devName = e.target.querySelector('div').getAttribute('dev-name')
      if (onDeveloperView) {
        onDeveloperView(developer)
      }
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
