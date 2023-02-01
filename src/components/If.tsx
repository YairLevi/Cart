import { PropsWithChildren } from 'react'


interface Props extends PropsWithChildren {
  condition: boolean
}

export default function If(props: Props) {
  return props.condition ? <>{props.children}</> : null
}