import * as React from 'react'
import '@sass/Settings.scss'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { useGetUsersQuery } from '@/features/api/userApi';

const Settings: React.FC = () => {

    const { data, isLoading, error } = useGetUsersQuery({})

    const nameTemplate = (user) => {
        return (
            <>
                <img src="pfp-temporary.png" />
                {user.first_name} { user.last_name}
            </>
        )
    }

    const user = (user) => {
        return (
            <>
                <img src={'pfp-temporary.png'} />
                {user.first_name} {user.last_name}
            </>
        )
    }

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
                    <div className="page__header">
                        <h2>Manage Users</h2>
                    </div>
                    <div className="settings-box">
                        <DataTable value={data} tableStyle={{ minWidth: '50rem' }}

                            paginator rows={5}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink">
                            <Column header="Name" body={nameTemplate} />
                            <Column field="email" header="E-mail"></Column>
                            <Column field="Name" header="Usage"></Column>
                        </DataTable>
                    </div>
                    <div className="page__header">
                        <h2>Profile Settings</h2>
                    </div>
                    <div className="form__controls">
                        <div className="form__controls__group">
                            <label>Profile Image</label>
                            <div className="profile__image">

                            </div>
                        </div>
                        <div className="form__controls__group">
                            <label>First Name</label>
                            <input type="text" />

                            <label>Last Name</label>
                            <input type="text" />
                        </div>
                        <div className="form__controls__group">
                            <label>E-mail</label>
                            <input type="text" />
                        </div>
                        <div className="form__controls__group">
                            <label>Password</label>
                            <input type="text" />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Settings