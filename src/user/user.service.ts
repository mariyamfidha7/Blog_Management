import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SuccessMessageDto } from 'src/dto/success-message.dto';
import { encodePassword } from 'src/utils/bcrypt.utils';
import User from 'src/entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Function to create user details.
   *
   * Request body shall contain:
   *  1. name: string (mandatory, max length: 30)
   *  2. username: string (mandatory, max length: 15)
   *  3. email: string (mandatory, unique, max length: 40)
   *  4. age: number
   *  5. password: string (mandatory)
   *  6. gender: string
   *
   * System shall perform the following checks:
   *   a. If mandatory fields are not provided, return error message: '<Field Name> is required'.
   *   b. If the email address provided is not in a valid format, return error message: 'Please provide valid Email'.
   *   c. If the email address already exists, return error message: 'Email Address already exists'.
   *   d. If the username has characters other than alphanumeric, return error message: 'Username does not allow other than alphanumeric chars'.
   *   e. If the password does not meet the complexity requirements (minimum 8 characters including number, special character, upper and lowercase), return error message: 'Use stronger password'.
   *
   * If the above validations are passed:
   *   1. Save the details to the database.
   *   2. Return the newly created user.
   *
   * @param {CreateUserDto} createUserDto - Object containing user details.
   * @returns {Promise<User>} - Newly created user.
   */

  async createUser(userDetails: CreateUserDto): Promise<SuccessMessageDto> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { username: userDetails.username },
      });
      if (existingUser) {
        throw new ConflictException('User already exists');
      }
      const password = encodePassword(userDetails.password);
      const newUser = this.userRepository.create({
        ...(userDetails as DeepPartial<User>),
        password,
      });
      await this.userRepository.save(newUser);
      return { message: 'User created' };
    } catch (error) {
      throw new ConflictException('Failed to create user');
    }
  }

  /**
   * Function to retrieve all users.
   *
   * System shall return a list of all users.
   *
   * @returns {Promise<User[]>} - Array of user objects.
   */
  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  /**
   * Function to view user details by ID.
   *
   * System shall retrieve user details by ID.
   *
   * @param {string} id - The ID of the user to be viewed.
   * @returns {Promise<User>} - User object corresponding to the provided ID.
   */
  async getUserByID(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Function to update user details by ID.
   *
   * Request body shall contain:
   *  1. name: string (optional, max length: 30)
   *  2. username: string (optional, max length: 15)
   *  3. email: string (optional, unique, max length: 40)
   *  4. age: number (optional)
   *  5. password: string (optional)
   *
   * System shall update the specified user with provided details.
   *
   * @param {string} id - The ID of the user to be updated.
   * @param {UpdateUserDto} updateUserDto - Object containing updated user details.
   * @returns {Promise<User>} - Updated user object.
   */
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  /**
   * Function to remove a user by ID.
   *
   * System shall remove the user with the provided ID.
   *
   * @param {string} id - The ID of the user to be removed.
   * @returns {Promise<{ affected?: number }>} - Object indicating the number of affected rows in the database.
   */
  async removeUser(id: string): Promise<SuccessMessageDto> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User removed' };
  }

  /**
   * Function to view user details by username.
   *
   * System shall retrieve user details by username.
   *
   * @param {string} username - The username of the user to be viewed.
   * @returns {Promise<User>} - User object corresponding to the provided ID.
   */
  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email: email } });
  }
}
