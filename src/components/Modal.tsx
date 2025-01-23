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
            <div className="modal-backdrop"></div>
            <div className="modal">
                Are you sure you want to delete this file?
                <div className="modal-options">
                    <Button text="Confirm" />
                    <Button text="Cancel" />
                </div>
            </div>
        </>
    )
}

export default Modal