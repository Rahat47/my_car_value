import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`User ${this.email} created`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`User ${this.email} updated`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`User ${this.email} removed`);
  }
}
