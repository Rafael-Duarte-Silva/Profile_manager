import { faker } from '@faker-js/faker';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class FakerUntil {
  createUser(): CreateUserDto {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;

    const user: CreateUserDto = {
      username: firstName,
      password: faker.string.numeric({ length: { min: 5, max: 10 } }),
      fullName: fullName,
      email: faker.internet.email({
        firstName: firstName,
        lastName: lastName,
        provider: '@example.com',
      }),
      phone: faker.phone.number({ style: 'human' }),
      job: faker.person.jobArea(),
    };

    return user;
  }
}
