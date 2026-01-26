import { API_PATHS } from './apiPaths';
import axiosInstance from './axioslnstance';

const uploadImage = async (imageFile) => {
    // 1. Corrected spelling to FormData
    const formData = new FormData(); 
    formData.append('image', imageFile);

    try {
        // 2. Fixed the path and the config object
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Fixed "Content" and "form"
            },
        });
        
        return response.data;
    } catch (error) {
        console.error('Error uploading the image', error);
        throw error;
    }
};

export default uploadImage;

