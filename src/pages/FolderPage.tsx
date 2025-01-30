import * as React from 'react'
import Drive from '@features/drive/Drive'
import Folder from "@features/drive/Folder"

const FolderPage: React.FC = () => {

  return (
    <div className="page-wrapper">
      <Folder />
    </div>
  )
}

export default FolderPage;