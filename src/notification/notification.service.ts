import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from './gateway/notification.gateway';
import { Role } from '../auth/interface/roles.enum';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationsGateway: NotificationsGateway) {}

  notifyAdmins(roles: Role[], payload: any) {
    for (const role of roles) {
      this.notificationsGateway.sendNotificationToRole(role, payload);
    }
  }

  notifyAdmin(payload: any) {
    this.notificationsGateway.sendNotificationToRole(
      Role.HospitalAdmin,
      payload,
    );
  }

  notifyWorkers(payload: any) {
    this.notificationsGateway.sendNotificationToRole(
      Role.HealthcareWorker,
      payload,
    );
  }

  notifyAllUsers(payload: any) {
    this.notificationsGateway.sendNotification(payload);
  }
}
