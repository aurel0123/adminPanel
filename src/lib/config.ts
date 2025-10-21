
export const config = {
    env : {
        apiBackend : import.meta.env.VITE_API_BACKEND || 'localhost',
        urlEndpointImageKit : import.meta.env.VITE_URL_ENDPOINT_IMAGE_KIT || ''
    }
}