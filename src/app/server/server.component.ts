import { ServerMessage } from './../shared/server-message';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Server } from '../shared/server';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent {
  @Input() serverInput!: Server;
  @Output() serverAction = new EventEmitter<ServerMessage>();

  color!: string;
  buttonText!: string;
  serverStatus: string = '';
  isLoading: boolean = false;

  ngOnInit() {
    this.setServerStatus(this.serverInput.isOnline);
  }

  setServerStatus(isOnline: boolean) {
    if (isOnline) {
      this.serverInput.isOnline = true;
      this.serverStatus = 'Online';
      this.color = '#66bb6a';
      this.buttonText = 'Shut down';
    } else {
      this.serverInput.isOnline = false;
      this.serverStatus = 'Offline';
      this.color = '#ff6b6b';
      this.buttonText = 'Start';
    }
  }

  makeLoading() {
    this.color = '#FFCA28';
    this.buttonText;
    this.buttonText = 'Pending...';
    this.isLoading = true;
    this.serverStatus = 'Loading';
  }

  sendServerAction(isOnline: boolean) {
    this.makeLoading();
    const payload = this.buildPayload(isOnline);
    this.serverAction.emit(payload);
  }

  buildPayload(isOnline: boolean): ServerMessage {
    if (isOnline) {
      return {
        id: this.serverInput.id,
        payload: 'deactivate',
      };
    } else {
      return {
        id: this.serverInput.id,
        payload: 'activate',
      };
    }
  }

  // toggleStatus(onlineStatus: boolean) {
  //   this.setServerStatus(!onlineStatus);
  // }
}
