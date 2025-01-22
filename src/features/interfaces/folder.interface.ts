/*

// API response shape for /folders 
export default interface FolderApiResponse { 
    children: []
    created_at: string
    deleted_at: string | null
    drive_id: string
    id: string
    is_root: boolean
    level: number
    name: string
    parent_id: string | null
    path: string
    updated_at: string
}

*/

export default interface Folder {
    id: string,
    parent_id: string,
    name: string,
    path: string,
    is_root: boolean,
    children: Folder[]
  }
  