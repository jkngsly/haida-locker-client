import * as React from 'react'
import '@sass/Settings.scss'

const Settings: React.FC = () => { 
    return(
        <>
            <div id="settings" className="box">
                <span className="box-title">Administrator</span>
                <div className="settings-box">
                    <div></div>
                </div>
                <span className="box-title">Profile Settings</span>
                <div className="settings-box">
                    <div></div>
                </div>
                <span className="box-title">Site Settings</span>
                <div className="settings-box">
                    <div></div>
                </div>
                <span className="box-title">Theme Configuration</span>
                <div className="settings-box">
                    <div></div>
                </div>
                <span className="box-title">Manage Users</span>
                <div className="settings-box">
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default Settings