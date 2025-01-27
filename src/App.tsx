import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@sass/App.scss'
import Nav from './Nav'
import DrivePage from '@pages/DrivePage'
import SettingsPage from '@pages/SettingsPage'
import Notifications from '@features/notifications/Notifications'
import RequireUser from '@components/requireUser'
import UnauthorizedPage from '@pages/UnauthorizedPage'
import Layout from '@components/Layout'

import Public from '@components/public/Public'
import LoginPage from '@pages/public/LoginPage'
import RegisterPage from '@pages/public/RegisterPage'
import ForgotPasswordPage from '@pages/public/ForgotPasswordPage'
import ResetPasswordPage from '@pages/public/ResetPasswordPage'
import HomePage from '@/pages/public/HomePage'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Notifications />
          <Routes>

            {/* Logged In */}
            <Route element={<RequireUser allowedRoles={['user']} />}>
               <Route element={<Layout />}>
                <Route path="" element={<DrivePage />} />
                <Route path="drive" element={<DrivePage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Route>

            {/* Logged Out */}
            <Route element={<Public />}>
              <Route path='unauthorized' element={<UnauthorizedPage />} />
              <Route path='home' element={<HomePage />} />
              <Route path='login' element={<LoginPage />} />
              <Route path='register' element={<RegisterPage />} />
              <Route path='forgot-password' element={<ForgotPasswordPage />} />
              <Route path='reset-password' element={<ResetPasswordPage />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
