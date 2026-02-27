import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
  } from 'typeorm';


export enum UserGender{
  Male = 'male',
  Female = 'female',
  Other = 'other',

}

  @Entity('users')
  export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column({ unique: true })
    email: string;


    @Column({ type: 'varchar', length: 100, nullable: true })
    firstName: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    lastName: string;

    @Column({ type: 'enum', enum: UserGender, default: UserGender.Other })
    gender: UserGender;

    @Column({ default: true})
    isActive: boolean;

    @Column({select: false})
    passwordHash: string;

    @Column({default: false})
    isEmailVerified: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
  }
