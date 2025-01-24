import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.scss"
import Nav from "./Nav"
import DrivePage from "@/pages/DrivePage"
import SettingsPage from "@/pages/SettingsPage"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <div id="page">
          <Routes>
            <Route path="/" element={<DrivePage />} />
            <Route path="/drive" element={<DrivePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
