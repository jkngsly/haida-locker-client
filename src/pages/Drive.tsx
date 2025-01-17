import * as React from 'react'
import FolderView from "../features/FolderView/FolderView"
import Button from '../components/Button';
import HeroIcon from '../components/HeroIcon';

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
          <div className="folder-search">
            <input type="text" className="" placeholder="Search" />
            <HeroIcon name="MagnifyingGlass" />
          </div>
          <div className="folder-filters">
            <a title="Show Filters"><HeroIcon name="AdjustmentsHorizontal" /></a>
          </div>
          <div className="w-3/6 p-4 pt-0 flex flex-row justify-end">
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
      <FolderView />
    </div>
  )
}

export default Drive;