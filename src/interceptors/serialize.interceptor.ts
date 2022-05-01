import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // run something before a request
    console.log('Before request', context);

    return next.handle().pipe(
      map((data: any) => {
        // run something after a request
        console.log('After request', data);
        // return plainToInstance(data, data);
      }),
    );
  }
}
