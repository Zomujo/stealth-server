import { Injectable } from '@nestjs/common';
import { AuditLog } from './models/audit.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAuditDto, UpdateAuditDto } from './dto';

@Injectable()
export class AuditsService {
  constructor(
    @InjectModel(AuditLog)
    private readonly auditLogRepository: typeof AuditLog,
  ) {}

  async create(payload: CreateAuditDto): Promise<void> {
    await this.auditLogRepository.create(payload);
  }

  findAll() {
    return `This action returns all audits`;
  }

  findOne(id: string) {
    return `This action returns a #${id} audit`;
  }

  update(id: string, _dto: UpdateAuditDto) {
    return `This action updates a #${id} audit`;
  }

  remove(id: string) {
    return `This action removes a #${id} audit`;
  }
}
