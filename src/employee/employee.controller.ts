import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from '../auth/interface/valid-roles.interface';
import { User } from '../auth/entities/user.entity';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { Employee } from './entities/employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @Auth(ValidRoles.owner)
  create(
    @GetUser() owner: User,
    @Body() empoyee: CreateEmployeeDto) {
    return this.employeeService.create(owner, empoyee);
  }
  
  @Post('login')
  login(@Body() loginUserDto: LoginEmployeeDto) {
    return this.employeeService.login(loginUserDto);
  } 

  @Auth(ValidRoles.employee)
  @Get('products')
  getProducts(
    @GetUser() employee: Employee
  ){
    return this.employeeService.findAllProducts(employee);
  }

  

  
}
