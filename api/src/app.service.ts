import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./userschema";
import mongoose, { Model } from "mongoose";
import { CreateUserDto } from "./Dto/createuserdto";
import { UpdateUserDto } from "./Dto/updateuserdto";
@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel:Model<User>){}
  
  async createUser(createuserDto:CreateUserDto):Promise<User>{
    const user = await this.userModel.create(createuserDto)
    return user;
  }

  async findall():Promise<User[]>{
    const users = await this.userModel.find({},{password:0});
    return users;
  }


  async deleteById(userId:mongoose.Types.ObjectId){
    const deleted = await this.userModel.findByIdAndDelete(userId);
    return deleted
  }



  async findbyid(userId:mongoose.Types.ObjectId):Promise<User>{
    const findbyid = await this.userModel.findById(userId);
    if(!findbyid){
      throw new NotFoundException(`User is not found with #${userId}`)
    }
    return findbyid;
  }


  async updateByID(userId:mongoose.Types.ObjectId, updateUserDto:UpdateUserDto):Promise<User>{
    const updateByid = await this.userModel.findByIdAndUpdate(userId,updateUserDto);
    return updateByid
  }


  

}
