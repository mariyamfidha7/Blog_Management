import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import Blog from 'src/entities/blog.entity';
import { UserModule } from 'src/user/user.module';
import { UserController } from 'src/user/user.controller';
import User from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, User]), AuthModule, UserModule],
  providers: [BlogsService, UserService],
  controllers: [BlogsController, UserController],
})
export class BlogsModule {}
