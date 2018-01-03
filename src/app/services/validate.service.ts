import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {
  constructor() { }
  validateTasklist(tasklist) {
    if(tasklist.title == undefined || tasklist.details == undefined) {
      return false;
    } else {
      return true;
    }
  }
}
