import "./App.css"
import FolderTree from "./features/FolderTree/FolderTree"
import FolderView from "./features/FolderView/FolderView"

const App = () => {
  return (
    <div>
      <nav>
        <a>Dashboard</a>
        <a>Vault</a>
        <FolderTree />
        <a>Link</a>
      </nav>
      <FolderView />
    </div>
  )
}

export default App
