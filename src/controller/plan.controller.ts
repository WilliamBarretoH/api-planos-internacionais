import { 
    Controller, Get, Post, Delete, Param, Body, ParseIntPipe, UseGuards 
  } from '@nestjs/common';
  import { PlanService } from 'src/service/plan.service';
  import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
  import { RolesGuard } from 'src/guards/role.guard';
  import { Roles } from 'src/decorators/roles.decorators';
  import { CreatePlanDto } from 'src/dto/create-plan.dto';
  
  @Controller('plans')
  export class PlanController {
    constructor(private readonly planService: PlanService) {}
  
    // (admin) Criar novo plano
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    create(@Body() dto: CreatePlanDto) {
      return this.planService.createPlan(dto.name, dto.price, dto.description);
    }
  
    // Listar todos
    @Get()
    findAll() {
      return this.planService.findAll();
    }
  
    // Buscar plano específico
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.planService.findById(id);
    }
  
    // (admin) Remover plano
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.planService.deletePlan(id);
    }
  }
  