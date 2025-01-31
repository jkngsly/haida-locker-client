import * as React from 'react'
import FolderGrid from "@/features/drive/FolderGrid/FolderGrid"
import HeroIcon from '@components/HeroIcon'
import FileUpload from '@features/drive/FileUpload/FileUpload'
import Modal from '@/components/Modal'
import { useEffect, useState } from 'react'
import { selectFolder } from '@/features/drive/FolderTree/folderTreeSlice'
import { useAppSelector } from '@/app/hooks'
import Button from '@components/Button'

const Drive: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const selectedFolder = useAppSelector(selectFolder)

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

  console.log(selectedFolder)
  if(selectedFolder != null) { 
    return (
      <>
        <div className="w-2/3 px-20">
          <div className="drive__header">
            
          <div className="text-3xl mr-6">Files</div>
            <div className="flex">          
              <FileUpload />
              <Button text="Create Folder" heroIcon="FolderPlus" />
              <input type="text" placeholder={"Search Folder: " + selectedFolder.name} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-row mb-6">
            {/**}
            <a title="Show Filters" className="block"><HeroIcon name="AdjustmentsHorizontal" /></a>
            {/* && (
                <div>
                  <input type="text" value={} onChange={} className="text-black" />
                  
                </div>
              )*/}
          </div>
          {selectedFolder.id.length > 2 && <FolderGrid search={searchTerm} /> }
           
        </div>
        <div id="folder-search">
        </div>
      </>
    )
  }
}

export default Drive;