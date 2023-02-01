import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import React, { PropsWithChildren, useRef, useState } from 'react';
import { useClickAnimation } from "../../hooks/useClickAnimation"
import './Dropdown.scss';
import If from "../If";

interface Props extends PropsWithChildren {
  title: string | JSX.Element
  onClick?: Function
  open?: boolean
}

export default function Dropdown(props: Props) {
  const [open, setOpen] = useState(props.open ?? true)
  const dropdownButtonRef = useRef(null)
  const arrowAnimationFunction: Function = useClickAnimation(dropdownButtonRef, 'open')

  function onToggleDropdown() {
    setOpen(prev => !prev)
    props.onClick?.apply(null)
    arrowAnimationFunction()
  }

  return (
    <div className='dropdown'>
      <div className='dropdown-header' onClick={onToggleDropdown}>
        {props.title}
        <div className='header-buttons'>
          <div ref={dropdownButtonRef} className={`toggle-dropdown`}>
            <FontAwesomeIcon icon={faChevronUp}/>
          </div>
        </div>
      </div>
      <If condition={open}>
        {props.children}
      </If>
    </div>
  )
}


interface ItemProps extends PropsWithChildren {
  onClick?: Function
}

function DropdownItem(props: ItemProps) {
  return (
    <div className='dropdown-item' onClick={() => { props.onClick?.apply(null) }}>
      {props.children}
    </div>
  )
}

Dropdown.Item = (props: ItemProps) => <DropdownItem {...props}/>