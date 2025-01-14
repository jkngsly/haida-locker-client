import "./App.css"
import FolderTree from "./features/FolderTree/FolderTree"

const App = () => {
  return (
    <div>
      <nav>
        <a>Dashboard</a>
        <a>Vault</a>
        <FolderTree />
        <a>Link</a>
      </nav>
    </div>
  )
}

export default App
