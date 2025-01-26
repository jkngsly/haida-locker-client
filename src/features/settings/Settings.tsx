import * as React from 'react'
import '@sass/Settings.scss'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { useGetUsersQuery } from '@/features/api/userApi';

const Settings: React.FC = () => { 

    const { data, isLoading, error } = useGetUsersQuery({})
    
    if (!isLoading && data) {
        return (
            <>
                <div id="settings" className="box">
                    {/*
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
                    */}
                    <span className="box-title">Manage Users</span>
                    <div className="settings-box">
                    <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="email" header="E-mail"></Column>
                        <Column field="first_name" header="First Name"></Column>
                        <Column field="last_name" header="Last Name"></Column>
                    </DataTable>
                    </div>
                </div>
            </>
        )
    }
}

export default Settings