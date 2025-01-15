import { FC } from 'react'
import * as HIcons from '@heroicons/react/24/outline'

interface Props {
  name: string,
}

const HeroIcon: FC<Props> = (props) => {

  const {...icons} = HIcons

  {/* @ts-ignore (ノಠ益ಠ)ノ彡┻━┻ */}
  const Icon = icons[props.name]

  return (
    <>
      <Icon aria-hidden="true" />
    </>
  )
}

export default HeroIcon