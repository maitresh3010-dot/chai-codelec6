import mongoose, {Schema} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const VideoSchema =  new Schema ({


    VideoFile :{
        type:String, required : true
    },
thumbnail :{
        type:String, required : true
    },
    
    description :{
        type:String, required : true
    },

    title :{
        type:String, required : true
    },


    duration :{
        type:Number, required : true
    },


    Views :{
        type:Number, default : 0
    },
    


    isPublished :{

        type:Boolean, default : true
    },



    owner :{
        type : Schema.Types.ObjectId,

        ref :  "User"
    }





}, {timestamps : true})


videoSchema.plugin(mongoosePaginate)

export const Video = mongoose.model("Video", VideoSchema)
