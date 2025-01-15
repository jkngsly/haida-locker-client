import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.scss"
import Nav from "./Nav"
import Drive from "./pages/Drive"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <div id="page">
          <Routes>
            <Route path="/" element={<Drive />} />
            <Route path="/drive" element={<Drive />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
