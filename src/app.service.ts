import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  getIndex() {
    return { title: 'Desafío 23' };
  }
}

