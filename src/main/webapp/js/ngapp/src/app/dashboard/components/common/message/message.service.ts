import { Injectable } from '@angular/core';
import { Message } from 'primeng/primeng';
import { Subject } from 'rxjs/Subject';

type Severities = 'success' | 'info' | 'warn' | 'error';

@Injectable()
export class MessageService {
  messageChange: Subject<Object> = new Subject<Object>();
  constructor() { }

  showMessage(severity: Severities, summary: string, detail: string) {
    this.messageChange.next({severity, summary, detail});
}


}
