"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakerUntil = void 0;
const faker_1 = require("@faker-js/faker");
class FakerUntil {
    createUser() {
        const firstName = faker_1.faker.person.firstName();
        const lastName = faker_1.faker.person.lastName();
        const fullName = `${firstName} ${lastName}`;
        const user = {
            login: firstName,
            password: faker_1.faker.string.numeric({ length: { min: 5, max: 10 } }),
            fullName: fullName,
            email: faker_1.faker.internet.email({
                firstName: firstName,
                lastName: lastName,
                provider: '@example.com',
            }),
            phone: faker_1.faker.phone.number({ style: 'human' }),
            job: faker_1.faker.person.jobArea(),
        };
        return user;
    }
}
exports.FakerUntil = FakerUntil;
//# sourceMappingURL=fakerUtil.js.map