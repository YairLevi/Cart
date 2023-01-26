import React, { PropsWithChildren } from 'react';
import './Dropdown.scss';


interface Props extends PropsWithChildren { }

export default function DropdownItem(props: Props) {
  return (
    <div className='dropdown-item'>
      {props.children}
    </div>
  )
}