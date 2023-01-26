import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox } from '../Checkbox/Checkbox';
import DropdownItem from './DropdownItem';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './Dropdown.scss';
import React, { useRef, useState } from 'react';
import { useClickAnimation } from "../../hooks/useClickAnimation"

export default function Dropdown() {
  const [open, setOpen] = useState(false)
  const list = ['Sugar', 'Olive oil', 'Soap']
  const dropdownButtonRef = useRef(null)
  const animationFunc: Function = useClickAnimation(dropdownButtonRef, 'open')

  function onToggleDropdown() {
    setOpen(prev => !prev)
    animationFunc()
  }

  return (
    <div className='dropdown'>
      <div className='dropdown-header'>
        <p>Some Food Category</p>
        <div className='header-buttons'>
          <div
            ref={dropdownButtonRef}
            onClick={onToggleDropdown}
            className={`toggle-dropdown`}
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </div>
        </div>
      </div>
      {
        open && list.map((value, index) => (
          <DropdownItem>
            <Checkbox key={index} text={value} />
          </DropdownItem>
        ))
      }
    </div>
  )
}

Dropdown.Item = () => <DropdownItem />

