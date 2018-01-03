import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as io from "socket.io-client";

@Injectable()
export class CommonService {
  endpoint = 'http://localhost:3000/api';
  socket = io('http://localhost:3000');
  snackbarPrimaryConfig = {
    duration: 3000,
    extraClasses: 'msb-primary'
  };

  snackbarAccentConfig = {
    duration: 3000,
    extraClasses: 'msb-accent'
  };

  snackbarWarnConfig = {
    duration: 3000,
    extraClasses: 'msb-warn'
  };

  constructor() { }
}
