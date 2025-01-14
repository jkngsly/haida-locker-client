// API response shape for /folders 
export default interface FolderApiResponse { 
    files: {
        id: string
        created_at: string
        updated_at: string
        deleted_at: string
        folder_id: string
        name: string
        path: string
        is_media: boolean
        mime_type: string
    }[]
    folder: Object
}