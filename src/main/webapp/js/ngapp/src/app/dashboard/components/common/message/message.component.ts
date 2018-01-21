import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';
import { MessageService } from './message.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {
  message: Message[] = [];
  subscription: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.subscribeToMessages();
  }

  subscribeToMessages() {
    this.subscription = this.messageService.messageChange
      .subscribe(notification => {
        this.message.length = 0;
        this.message.push(notification);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
