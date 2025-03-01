import HeroIcon from "@/components/HeroIcon"
import Ding from "@/features/notifications/ding.interface"
import { useEffect, useState } from "react"

interface Props { 
    ding: Ding
}

const NotificationDing: React.FC<Props> = (props) => {
    const ding = props.ding

    const [addClass, setAddClass] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setAddClass(true);
      }, 5000); // 30 seconds in milliseconds
  
      return () => clearTimeout(timeout); // Cleanup on unmount
    }, []);

    const handleActionClick = () => { 
        // TODO: Callback actions
        console.log(ding.action)
    }

    return (
        <div className={addClass ? 'ding ding-be-gone' : 'ding'}>
            {ding.icon && <HeroIcon name={ding.icon} />}
            {ding.text &&
                <div>{ding.text}
                    {ding.actionText && ding.action && <a className="ding-action" onClick={handleActionClick}>{ding.actionText}</a>}
                </div>
            }
        </div>
    )
}

export default NotificationDing