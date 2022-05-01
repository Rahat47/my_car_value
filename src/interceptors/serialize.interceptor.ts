import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

export function Serialize(DTO: any) {
  return UseInterceptors(new SerializeInterceptor(DTO));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private DTO: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.DTO, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
