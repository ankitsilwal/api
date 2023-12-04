import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './userschema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{name:User.name, schema: UserSchema}]),
    MongooseModule.forRoot(process.env.MONGODB_URI)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
