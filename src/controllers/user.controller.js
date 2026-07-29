import {asyncHandler}from "../utils/asyncHandler.js"
import {ApiError}from "../utils/ApiError.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { user as User } from "../models/user.model.js"


const registerUser  = asyncHandler (async(req, res)=>{
    // get user details from frontend 
    // validation -  not empty 
    // check if user already exists 
    // user name se bhi aur email se bhi 
    // check for images and avtar
    //cloudniry uploAD 
    // create user object - create entry in db  
    // remove password and response field from response 
    // return res 


    const{fullName ,username,email,password} = req.body

    console.log("email", email)


    // if(fulName === ""){
    //     throw  new ApiError(400, "full name is required ")
    // }

    if([fullName, email, username, password].some((field)=>
        field?.trim() === ""
    )){
        throw new ApiError(400, "all fields are required")
    }
   const existedUser = await User.findOne({
        $or:[{username},{email}]
    })

    if( existedUser){
        throw new ApiError(409, "username or email already exists")
    }
   const avatarLocalPath = req.files?.avatar?.[0]?.path
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path

    

    if(!avatarLocalPath){
        throw  new ApiError(400, "avatar file is required")
    }

    const avatar =   await uploadOnCloudinary(avatarLocalPath)
   const coverImage= await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
    throw new ApiError(400,"Avatar file is required")
   }

  const created = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
   })

   const createdUser  = await User.findById(created._id).select(
    "-password -refreshToken"
   )

   if(!createdUser)
   {
     throw new ApiError(500, "some went wrong while  registring the user")
   }  
   
   return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
   )
})


export {registerUser,}