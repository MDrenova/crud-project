import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/entities/employee.entity';
import { UserService } from './user/user.service';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin@admin',
      database: 'mydb',
      migrations: ['dist/migration/*.js'],
      entities: [User, Employee],
      synchronize: false,
      logging: true
    }),
    UserModule,
    EmployeeModule],
  controllers: [AppController],
  providers: [AppService, UserService, UserRepository],
})
export class AppModule {}
