import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import {
  UpdateContactInfoDto,
  UpdateEmployeeDto,
  UpdateManagerDto,
} from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { EntityManager, Repository } from 'typeorm';
import { ContactInfo } from './entities/contact-info.entity';
import { EmployeeQueryDto } from './dto/employee-query.dto';
import { EmployeeErrorMessages as ErrMsg } from './dto/employee.error.messages';
@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const contactInfo = new ContactInfo(createEmployeeDto.contactInfo);
    const newEmployee = new Employee({ ...createEmployeeDto, contactInfo });
    return await this.entityManager.save(newEmployee);
  }

  async findAll(findEmployeeDto: EmployeeQueryDto) {
    const { name, department, position, page, limit } = findEmployeeDto;
    const queryBuilder = this.employeeRepository.createQueryBuilder('employee');

    if (name) {
      queryBuilder.andWhere('employee.name LIKE :name', { name: `%${name}%` });
    }

    if (department) {
      queryBuilder.andWhere('employee.department LIKE :department', {
        department: `%${department}%`,
      });
    }

    if (position) {
      queryBuilder.andWhere('employee.position LIKE :position', {
        position: `%${position}%`,
      });
    }

    queryBuilder.skip((page - 1) * limit).take(limit);

    const [employees, total] = await queryBuilder.getManyAndCount();
    return {
      employees,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  }

  async findEmployee(id: string): Promise<Employee> {
    const employee =  await this.employeeRepository.findOne({
      where: { id: id },
      relations: {
        manager: true,
        subordinates: true,
        tasks: true
      },
    });
    if(!employee) throw new NotFoundException(ErrMsg.EmployeeNotFound);
    return employee; 
  }

  async updateEmployee(employeeId: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    let employee = await this._findById(employeeId);
    Object.entries(updateEmployeeDto).forEach(([key, newValue]) => {
      if (newValue != null) employee[key] = newValue;
    });
    return await this.employeeRepository.save(employee);
  }

  async addManager(employeeId: string, updateManagerDto: UpdateManagerDto): Promise<Employee> {
    const { managerId } = updateManagerDto;
    let employee = await this._findById(employeeId);
    if (employee.id === managerId) throw new BadRequestException(ErrMsg.CannotMakeYourselfManager);

    try {
      employee.managerId = managerId;
      return await this.employeeRepository.save(employee);
    } catch (error) {
      throw new BadRequestException(ErrMsg.ManagerNotFound)
    }
  }

  async updateContactInfo(employeeId: string, updateContactInfoDto: UpdateContactInfoDto): Promise<Employee> {
    let employee = await this._findById(employeeId);
    Object.entries(updateContactInfoDto).forEach(([key, newValue]) => {
      if (newValue != null) employee.contactInfo[key] = newValue;
    });
    return await this.employeeRepository.save(employee);
  }

  async remove(id: string) {
    const deleteResult = await this.employeeRepository.delete(id);
    if (deleteResult.affected === 0) throw new NotFoundException(ErrMsg.EmployeeNotFound);
    return { message: 'employee removed' };
  }

  private async _findById(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { id: id }});
    if(!employee) throw new NotFoundException(ErrMsg.EmployeeNotFound);
    return employee;
  }
}
