import {v2 as cloudinary} from 'cloudinary';

import fs  from 'fs';
 // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINAERY_CLOUD_NAME,

        api_key: process.env.CLOUDINAERY_API_KEY, 
        api_secret: process.env.CLOUDINAERY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    const uploadOnCloudinary  = async (localFIlepath)=>{


        try{
            if(!localFIlepath) throw new Error("File path is required")

        const response  =    await  cloudinary.uploader.upload(localFilepath, {
                resource_type : "auto",
            })
            console.log("file is uploaded on cloudinary", response.url)
        return response.url        }

        catch(err)
        {

         fs.unlinkSync(localFilepath) // remove krto loaclly uploaded file 

         return null;

        }
    }

    export {uploadOnCloudinary}