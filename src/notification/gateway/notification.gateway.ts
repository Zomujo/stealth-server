import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../../auth/interface/jwt.config';
import { ConfigType } from '@nestjs/config';
import { IUserPayload } from '../../auth/interface/payload.interface';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    const bearerToken = client.handshake?.headers?.authorization;
    let role = 'all';
    if (bearerToken) {
      const [_type, token] = bearerToken ? bearerToken.split(' ') : [];
      const user = await this.decodeToken(token);
      role = user.role ?? 'null';
      client.join(role);
    }

    console.log(`Client connected: ${client.id} with role ${role}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  sendNotification(payload: any) {
    this.server.emit('newNotification', payload);
  }

  sendNotificationToRole(role: string, message: any) {
    this.server.to(role).emit('newNotification', message);
  }
  async decodeToken(token: string) {
    const payload: IUserPayload = await this.jwtService.verifyAsync(token, {
      secret: this.jwtConfiguration.secret,
    });
    return payload;
  }
}
