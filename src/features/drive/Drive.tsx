import * as React from 'react'
import FolderView from "@features/drive/FolderView/FolderView"
import HeroIcon from '@components/HeroIcon';
import FileUpload from '@features/drive/FileUpload/FileUpload';
import Modal from '@/components/Modal';

const Drive: React.FC = () => {

  return (
    <>
      <div className="flex flex-row  h-1/6">
          <div className="folder-search">
            <input type="text" className="" placeholder="Search" />
            <HeroIcon name="MagnifyingGlass" />
          </div>
          <div className="folder-filters">
            <a title="Show Filters"><HeroIcon name="AdjustmentsHorizontal" /></a>
          </div>
          <div className="w-3/6 p-4 pt-0 flex flex-row justify-end">
            <FileUpload />
          </div>
          {/* && (
            <div>
              <input type="text" value={} onChange={} className="text-black" />
              <Button text="Create Folder" onClick={} />
            </div>
          )*/}
      </div>
      <FolderView />
    </>
  )
}

export default Drive;