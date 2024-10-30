import mongoose, {Schema, Document} from "mongoose"

//all these will eventually goes into mongoose document so all below will be document, thats why extended

export interface Message extends Document {
    content: string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema ({

    content :{
        type: String,
        required: true
    },

    createdAt : {
        type: Date,
        required: true,
        default: Date.now()
    }


})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    varifyCode: string;
    varifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean
    message: Message[]
}

const UserSchema: Schema<User> = new Schema ({

    username :{
        type: String,
        required:[true, "Username is required"],
        trim : true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        //checking for email is valid or not, thats why we used regex.
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please use a valid email address"]
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },
    varifyCode: {
        type: String,
        required: [true, "Verify code is required"]
    },
    varifyCodeExpiry :{
        type: Date,
        required: [true, "Verify code expiry is required."]
    },
    isVerified :{
        type: Boolean,
        default: false
    },
    isAcceptingMessage :{
        type: Boolean,
        default: true
    },
    message: [MessageSchema]
    


})

const UserModel = (mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", UserSchema))

export default UserModel;