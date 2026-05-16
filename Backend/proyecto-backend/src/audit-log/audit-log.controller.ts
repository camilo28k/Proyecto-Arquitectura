import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuditAction } from '@prisma/client';
import { RolesGuard } from '../auth/roles.guard';
import { AuditLogService } from './audit-log.service';

@Controller('audit-logs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get()
  findAll(
    @Query('action') action?: AuditAction,
    @Query('entity') entity?: string,
    @Query('userId') userId?: string,
  ) {
    return this.auditLogService.findAll({
      action,
      entity,
      userId,
    });
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.auditLogService.findByUser(userId);
  }

  @Get('entity/:entity/:entityId')
  findByEntity(
    @Param('entity') entity: string,
    @Param('entityId') entityId: string,
  ) {
    return this.auditLogService.findByEntity(entity, entityId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditLogService.findOne(id);
  }
}
