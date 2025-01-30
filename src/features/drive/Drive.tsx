import * as React from 'react'
import Folder from "@/features/drive/Folder/Folder"
import HeroIcon from '@components/HeroIcon'
import FileUpload from '@features/drive/FileUpload/FileUpload'
import Modal from '@/components/Modal'
import { useEffect, useState } from 'react'
import { selectName } from '@/features/drive/FolderTree/folderTreeSlice'
import { useAppSelector } from '@/app/hooks'

const Drive: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const folderName = useAppSelector(selectName)

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
      <div className="w-2/3">
        <div className="flex flex-row mb-6">

          <FileUpload />
          {/*<input type="text" className="" placeholder={"Search Folder: " + folderName} onChange={(e) => setSearchTerm(e.target.value)} />*}
          <a title="Show Filters" className="block"><HeroIcon name="AdjustmentsHorizontal" /></a>
          {/* && (
              <div>
                <input type="text" value={} onChange={} className="text-black" />
                <Button text="Create Folder" onClick={} />
              </div>
            )*/}
        </div>
        <Folder search={searchTerm} />
      </div>
      <div id="folder__search">

      </div>
    </>
  )
}

export default Drive;