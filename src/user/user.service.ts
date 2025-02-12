import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../auth/models/user.model';
import { Facility } from '../admin/facility/models/facility.model';
import { CreateSettingsDto } from './dto';
import { Settings } from './models/setting.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Settings) private settingsRepository: typeof Settings,
  ) {}

  async findOne(userId: string) {
    const user = await this.userRepository.findByPk(userId, {
      include: [{ model: Facility, attributes: ['id', 'name'] }],
      attributes: [
        'id',
        'createdAt',
        'updatedAt',
        'imageUrl',
        'fullName',
        'email',
        'phoneNumber',
        'departmentId',
        'role',
        'permissions',
        'status',
      ],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async addSettings(dto: CreateSettingsDto, userId: string) {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    try {
      const settings = await this.findSettings(userId);
      await settings.update({ ...dto });
    } catch {
      await this.settingsRepository.create({
        ...dto,
        userId,
      });
    }

    return;
  }

  async findSettings(userId: string) {
    const settings = await this.settingsRepository.findOne({
      where: { userId },
      attributes: [
        'id',
        'emailDepartmentRequests',
        'emailItemLowStocks',
        'emailItemOutOfStock',
      ],
    });
    if (!settings) {
      throw new NotFoundException('Settings not found');
    }
    return settings;
  }
}
