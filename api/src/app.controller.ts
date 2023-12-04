import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
  Delete,
  Put,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateUserDto } from "./Dto/createuserdto";
import { User } from "./userschema";
import mongoose from "mongoose";
import { UpdateUserDto } from "./Dto/updateuserdto";

@Controller("add")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createUser(@Body() createuserDto: CreateUserDto) {
    try {
      return await this.appService.createUser(createuserDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get()
  async getall(): Promise<User[]> {
    const users = await this.appService.findall();
    return users;
  }

  @Get(":id")
  async getById(@Param("id") userId: mongoose.Types.ObjectId) {
    try {
      const user = await this.appService.findbyid(userId);
      return user;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  @Delete(":id")
  async deletebyId(@Param("id") userId: mongoose.Types.ObjectId) {
    try {
      const deleteUser = await this.appService.deleteById(userId);

      return { message: "user deleted" };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(":id")
  async updateByID(
    @Param("id") userId: mongoose.Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    try {
      const updateUser = await this.appService.updateByID(
        userId,
        updateUserDto
      );
      return updateUser;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
}
