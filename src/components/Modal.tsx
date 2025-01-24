import * as React from 'react'
import Button from './Button'

interface Props {
    text?: string,
    onClick?: () => void,
    heroIcon?: string,
    className?: string
}

const Modal: React.FC<Props> = (props) => { 
    
    return (
        <>
            <div className="modal-backdrop">
                <div className="modal">
                    { props.text && props.text}
                    <div className="modal-options">
                        <Button text="Confirm" />
                        <Button text="Cancel" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal