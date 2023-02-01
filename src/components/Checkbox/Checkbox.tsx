import React, { useState } from "react";
import { checkmarkCircle, ellipseOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import './Checkbox.scss';


interface Props {
  text?: string
  onClick?: Function
}

export function Checkbox(props: Props) {
  const [checked, setChecked] = useState(false);

  const CheckedIcon = () => (
    <div className='checkbox-icon checked'>
      <IonIcon icon={checkmarkCircle} />
    </div>
  )
  const UncheckedIcon = () => (
    <div className='checkbox-icon unchecked'>
      <IonIcon icon={ellipseOutline} />
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