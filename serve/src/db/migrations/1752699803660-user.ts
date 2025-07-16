import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1752699803660 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      ` CREATE TYPE user_role AS ENUM ('ADMIN', 'USER');
        CREATE TYPE user_status AS ENUM ('MANUALLY', 'AUTOMATICALLY');

        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            login TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role user_role NOT NULL,
            full_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            job TEXT NOT NULL,
            phone TEXT NOT NULL UNIQUE,
            status user_status NOT NULL,
            date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user;`);
  }
}
