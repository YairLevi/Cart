import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import './Checkbox.scss';


interface Props {
  text?: string
  onClick?: Function
}

export function Checkbox(props: Props) {
  const [checked, setChecked] = useState(false);

  const CheckedIcon = () => (
    <div className='checkbox-icon checked'>
      <FontAwesomeIcon icon={faCircleCheck} />
    </div>
  )
  const UncheckedIcon = () => (
    <div className='checkbox-icon unchecked'>
      <FontAwesomeIcon icon={faCircle} />
    </div>
  )

  function handleClick() {
    setChecked(prev => !prev)
    if (props.onClick) props.onClick()
  }

  return (
    <div className='checkbox' onClick={handleClick}>
      <div className='checkbox-icon'>
        {checked ? <CheckedIcon /> : <UncheckedIcon />}
      </div>
      <p className='checkbox-text'>
        {props.text}
      </p>
    </div>
  )
}