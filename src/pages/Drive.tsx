import * as React from 'react'
import FolderView from "../features/FolderView/FolderView"
import Button from '../components/Button';

const Drive: React.FC = () => {

  return (
    <div className="page-wrapper">
      <input
        type="file"
        //ref={fileInputRef}
        multiple
        style={{ display: 'none' }}
        //onChange={}
        id="upload" />
      <div className="flex flex-row  h-1/6">
        <div className="w-1/6">
        </div>
        <div className="w-5/6 flex flex-row">
          <div className="w-1/6 p-4 pt-0 flex flex-row justify-start">
            {/* TODO: Something with this */}
          </div>
          <div className="w-5/6 p-4 pt-0 flex flex-row justify-end">
            <Button text="Upload File" heroIcon="CloudArrowUp" />
            <Button text="Create Folder" heroIcon="FolderPlus" />
          </div>
          {/* && (
            <div>
              <input type="text" value={} onChange={} className="text-black" />
              <Button text="Create Folder" onClick={} />
            </div>
          )*/}
        </div>
      </div>
      <FolderView />
    </div>
  )
}

export default Drive;