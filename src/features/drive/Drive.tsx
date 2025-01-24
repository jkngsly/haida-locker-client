import * as React from 'react'
import FolderView from "@features/drive/FolderView/FolderView"
import HeroIcon from '@components/HeroIcon'
import FileUpload from '@features/drive/FileUpload/FileUpload'
import Modal from '@/components/Modal'
import { useEffect, useState } from 'react'

const Drive: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  let searchValue = null;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Adjust the timeout delay as needed

    return () => clearTimeout(timeoutId); // Cleanup on unmount or search term change
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchValue = debouncedSearchTerm;
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <div className="flex flex-row  h-1/6">
          <div className="folder-search">
            <input type="text" className="" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
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
      <FolderView search={searchTerm} />
    </>
  )
}

export default Drive;