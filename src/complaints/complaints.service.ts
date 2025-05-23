import { Injectable } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create.dto';
import { MailService } from '../notification/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../auth/models/user.model';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/sequelize';
import { CustomerCareAgent } from './models/agent.entity';

@Injectable()
export class ComplaintsService {
  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    @InjectModel(CustomerCareAgent)
    private customerAgentRepository: typeof CustomerCareAgent,
  ) {}
  async create(dto: CreateComplaintDto, userId: string) {
    const user = await this.userService.findOne(userId);
    const customerAgents = await this.customerAgentRepository.findAll({
      attributes: ['id', 'email'],
    });
    const customerAgentsEmails: string = customerAgents
      .map((agent) => agent.email)
      .join(', ');
    return this.sendComplaintMail(dto, user, customerAgentsEmails);
  }

  private async sendComplaintMail(
    dto: CreateComplaintDto,
    user: User,
    customerAgentsEmails: string,
  ) {
    const dateTimeIssueOccured = new Date(
      dto.dateTimeIssueOccured,
    ).toUTCString();
    // to: this.configService.get<string>('CUSTOMER_SERVICE_MAIL'),
    const email = {
      from: this.configService.get<string>('EMAIL_FROM'),
      to: customerAgentsEmails,
      subject: 'New Complaint Lodged',
      template: './complaint',
      context: {
        email: user.email,
        fullName: user.fullName,
        facility: user.facility.id,
        department: user.departmentId || 'not provided',
        feature: dto.feature,
        complaint: dto.complaint,
        errorMessage: dto.errorMessage || 'not provided',
        dateTimeIssueOccured,
      },
    };

    this.mailService.send(email);
  }
}
