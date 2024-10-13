import{v2 as cloudinary} from 'cloudinary';


export const connectCloudinary=async()=>{
    await cloudinary.config({
        cloud_name:process.env.CLOUDYNARY_NAME,
        api_key:process.env.CLOUDYNARY_API_KEY,
        api_secret:process.env.CLOUDYNARY_SECRET_KEY
    })
}

