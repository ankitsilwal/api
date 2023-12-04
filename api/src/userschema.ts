import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema({timestamps:true})

export class User{
    _id : mongoose.Types.ObjectId;

    @Prop()
    username: string;
    @Prop()
    password: string;
    @Prop()
    role: string
}


export const UserDocument = User && Document;
export const UserSchema = SchemaFactory.createForClass(User);