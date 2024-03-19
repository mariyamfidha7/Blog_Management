import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import Blog from 'src/entities/blog.entity';
import User from 'src/entities/user.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Create a new blog post.
   *
   * @param {CreateBlogDto} createBlogDto - Object containing blog post details.
   * @param {string} token - Authentication token.
   * @returns {Promise<Blog>} - Newly created blog post.
   */
  async createBlog(createBlogDto: CreateBlogDto, token: string): Promise<Blog> {
    const decodedToken = await this.jwtService.verifyAsync(token);

    if (!decodedToken.sub) {
      throw new UnauthorizedException('Invalid token');
    }

    const userExists = await this.checkUserExists(decodedToken.sub);
    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const blog: Blog = new Blog();
    blog.title = createBlogDto.title;
    blog.description = createBlogDto.description;
    blog.author = decodedToken.sub;
    blog.tags = createBlogDto.tags;
    return this.blogRepository.save(blog);
  }

  /**
   * Retrieve a list of blog posts with pagination.
   *
   * @param {number} offset - Offset value for pagination.
   * @returns {Promise<Pagination<Blog>>} - Paginated list of blog posts.
   */
  async getAllBlog(limit: number, offset: number): Promise<Pagination<Blog>> {
    if (offset === undefined || isNaN(offset)) {
      throw new BadRequestException('Missing or invalid offset value');
    }

    const paginationOptions = {
      limit,
      page: Math.floor(offset / limit) + 1,
    };

    const paginationResult: Pagination<Blog> = await paginate<Blog>(
      this.blogRepository,
      paginationOptions,
      { relations: ['author'] },
    );

    if (paginationResult.items.length === 0) {
      throw new NotFoundException('No blogs found');
    }

    return paginationResult;
  }

  /**
   * Retrieve details of a blog post by ID.
   *
   * @param {number} id - ID of the blog post to retrieve.
   * @returns {Promise<Blog>} - Blog post object.
   */
  async getBlogByID(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException('Blog does not exist');
    }
    return blog;
  }

  /**
   * Update a blog post by ID.
   *
   * @param {number} id - ID of the blog post to update.
   * @param {UpdateBlogDto} updateBlogDto - Object containing updated blog post data.
   * @param {string} token - Authentication token.
   * @returns {Promise<Blog>} - Updated blog post object.
   */
  async updateBlog(
    id: number,
    updateBlogDto: UpdateBlogDto,
    token: string,
  ): Promise<Blog> {
    const decodedToken = await this.jwtService.verifyAsync(token);
    if (!decodedToken.sub) {
      throw new UnauthorizedException('Invalid token');
    }

    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['author_id'],
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (blog.author.id !== decodedToken.sub) {
      throw new UnauthorizedException(
        'You are not authorized to update this blog',
      );
    }

    if (updateBlogDto.title !== undefined) {
      blog.title = updateBlogDto.title;
    }
    if (updateBlogDto.description !== undefined) {
      blog.description = updateBlogDto.description;
    }

    return this.blogRepository.save(blog);
  }

  /**
   * Remove a blog post by ID.
   *
   * @param {number} id - ID of the blog post to remove.
   * @param {string} token - Authentication token.
   * @returns {Promise<{ affected?: number }>} - Object indicating the number of affected rows in the database.
   */
  async deleteBlog(id: number, token: string): Promise<{ affected?: number }> {
    const decodedToken = await this.jwtService.verifyAsync(token);
    if (!decodedToken.sub) {
      throw new UnauthorizedException('Invalid token');
    }

    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (blog.author.id !== decodedToken.sub) {
      throw new UnauthorizedException(
        'You are not authorized to delete this blog',
      );
    }

    return this.blogRepository.delete(id);
  }

  async checkUserExists(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return !!user;
  }
}
