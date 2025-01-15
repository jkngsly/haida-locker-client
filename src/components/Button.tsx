import * as React from 'react'
import HeroIcon from './HeroIcon'

interface Props { 
    text?: string, 
    onClick?: () => void, 
    heroIcon?: string, 
    className?: string
}

const Button: React.FC<Props> = (props) => { 
    const className = "btn" + (props.className ? props.className : "")
    
    return (
        <button className={className} onClick={props.onClick}>
            {/* Optional Hero Icon */}
            { props.heroIcon && <HeroIcon name={props.heroIcon} /> }

            {/* Optional text */}
            { props.text && props.text }
        </button>
    )
}

export default Button