import { ReactNode, FunctionComponent } from 'react'

type Props = {
  children?: ReactNode
}

const Calendar: FunctionComponent = ({ children }: Props) => {
  return <div className="calendar">{children}</div>;
}

export default Calendar
