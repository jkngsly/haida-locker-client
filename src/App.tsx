import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.scss"
import Nav from "./Nav"
import DrivePage from "./pages/DrivePage"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <div id="page">
          <Routes>
            <Route path="/" element={<DrivePage />} />
            <Route path="/drive" element={<DrivePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
