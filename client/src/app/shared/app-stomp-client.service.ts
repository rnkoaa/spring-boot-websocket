import {Injectable} from "@angular/core";
import * as SockJS from "sockjs-client";
import {Subject} from "rxjs";

const Stomp = require('stompjs/lib/stomp').Stomp;

@Injectable()
export class AppStompClient {
  connected: boolean = false;
  public stompClient: any;

  connect(url: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.connected) {
        resolve(true);
      }
      const that = this;
      const socket = new SockJS(url);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, (frame) => {
        that.connected = true;
        //check if frame is connected.
        resolve(true);
      }, (err) => {
        that.connected = false;
        console.log('err', err);
        reject(err);
      });
    });
  }

  subscribe(subscriberUrl: string, subscriber: Subject<any>) {
    if (this.connected) {
      this.stompClient.subscribe(subscriberUrl, (response) => {
        subscriber.next(response.body)
      });
    } else {
      throw new Error("Call connect before subscribing");
    }
  }

  send(url, data) {
    if (this.connected) {
      this.stompClient.send(url, {}, JSON.stringify(data));
    } else {
      throw new Error("Call connect before subscribing");
    }
  }

  disconnect() {
    if (this.connected || this.stompClient != null) {
      this.stompClient.disconnect();
      this.connected = false;
      this.stompClient = null;
    }
  }
}
