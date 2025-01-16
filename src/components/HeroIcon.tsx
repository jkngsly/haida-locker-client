import { FC } from 'react'
import * as HIcons from '@heroicons/react/24/outline'

interface Props {
  name: string,
  onClick?: () => void, 
}

const HeroIcon: FC<Props> = (props) => {

  const {...icons} = HIcons
  let iconName = props.name + "Icon";
  {/* @ts-ignore (ノಠ益ಠ)ノ彡┻━┻ */}
  const Icon = icons[iconName]

  if(Icon) { 
    return (
      <>
        <Icon aria-hidden="true" onClick={props.onClick} />
      </>
    )
  }
}

export default HeroIcon