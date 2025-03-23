import { v2 as cloudinary } from 'cloudinary'
import 'dotenv/config'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: '/avatars',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
})


const upload = multer({ storage })
export { upload, cloudinary }