import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class createClientsTable1588713348559
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE "books" (
      "id" varchar NOT NULL DEFAULT uuid_generate_v4(), 
      "title" varchar NOT NULL,
      "subtitle" varchar NOT NULL,
      "description" varchar NOT NULL,
      "author" varchar NOT NULL, 
      "coverPicture" varchar NOT NULL, 
      CONSTRAINT "PK_f3f2f25a099d24e12545b70b025" PRIMARY KEY ("id"));
    `,[])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('books');
  }
}