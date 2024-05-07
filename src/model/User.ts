import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified:boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}
const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
match:[ /^[^\s@]+@[^\s@]+\.[^\s@]+$/,"please use a valid email"]
      },
      password: {
        type: String,
        required: [true, "Password is required"]
      },
      verifyCode: {
        type: String,
        required: true
      },
      verifyCodeExpiry: {
        type: Date,
        required: true
      },
      isVerified: {
        type: Boolean,
        required: false
      },
      
      isAcceptingMessage: {
        type: Boolean,
        default: true
      },
      messages: [{MessageSchema}],
      
  });

//in next code runs at edge time so it does not no 1 time boot up horhi hai ki nhi
//therefore two ki db bana hai ki nhi if nhi so bana do
  const UserModel=(mongoose.models.User as mongoose.Model<User>)||(mongoose.model<User>("User",UserSchema))

  export default UserModel;