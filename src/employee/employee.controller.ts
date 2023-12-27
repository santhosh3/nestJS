import { Controller, Get, Post, Body, Patch, Param, Delete, Query,ParseIntPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Prisma, Role } from '@prisma/client';
import { Throttle,SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeeService.create(createEmployeeDto);
  }

  @SkipThrottle({default: false})
  @Get()
  findAll(@Query('role') role?: Role) {
    return this.employeeService.findAll(role);
  }

  @Throttle({default:{ttl:1000,limit:1}})
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
