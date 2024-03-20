export class ValidationMessages {
  static readonly nameNotEmpty = 'Name cannot be empty.';
  static readonly nameIsString = 'Name should be a string.';
  static readonly nameMaxLength = 'Name cannot exceed 30 characters.';
  static readonly usernameNotEmpty = 'Username cannot be empty.';
  static readonly usernameIsString = 'Username should be a string.';
  static readonly usernameMinLength =
    'Username must have at least 3 characters.';
  static readonly usernameMaxLength = 'Username cannot exceed 15 characters.';
  static readonly emailInvalidFormat = 'Invalid email format.';
  static readonly emailNotEmpty = 'Email cannot be empty.';
  static readonly emailMaxLength = 'Email cannot exceed 40 characters.';
  static readonly ageIsInt = 'Age must be an integer.';
  static readonly genderEnum = 'Gender must be one of: f, m, u.';
  static readonly passwordNotEmpty = 'Password cannot be empty.';
  static readonly titleNotEmpty = 'Title cannot be empty.';
  static readonly titleIsString = 'Title should be a string.';
  static readonly descriptionNotEmpty = 'Description cannot be empty.';
  static readonly tagNotEmpty = 'Tag cannot be empty.';
  static readonly tagIsString = 'Tag should be a string.';
}
