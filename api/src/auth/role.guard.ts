
import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard {
  canActivate(context: any) {
    return true;
  }
}
