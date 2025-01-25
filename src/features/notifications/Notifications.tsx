import HeroIcon from '@components/HeroIcon'
import '@sass/Notifications.scss'

import { selectDings } from "./notificationsSlice"
import { useAppSelector } from '@app/hooks'
import NotificationDing from '@/features/notifications/NotificationDing'

interface Props {

}

const Notifications: React.FC<Props> = (props) => {
    const dings = useAppSelector(selectDings)

    return (
        <div id="notifications">
            {dings && dings.map(function (ding, index) {
                return (
                    <NotificationDing key={index} ding={ding} />
                )
            })}
        </div>
    )
}

export default Notifications