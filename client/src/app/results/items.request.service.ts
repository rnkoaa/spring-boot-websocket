import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {AppStompClient} from "../shared/app-stomp-client.service";

const Stomp = require('stompjs/lib/stomp').Stomp;

@Injectable()
export class ItemsRequestService {
  constructor(private _appStompclient: AppStompClient) {
  }

  private responseSubject = new Subject<any>();
  public responseObservable: Observable<any> = this.responseSubject.asObservable();
  private url = `/item-requests`;
  private subscriberUrl = '/user/topic/item-requests';
  private sendUrl = `/app/item-requests`;

  connect(): Promise<boolean> {
    return this._appStompclient.connect(this.url);
  }

  disconnect(){
    this._appStompclient.disconnect();
  }

  public send(itemRequest: any) {
    if (this._appStompclient.connected) {
      console.log("stomp client is connected");
      this._appStompclient.send(this.sendUrl, itemRequest);
      this._appStompclient.subscribe(this.subscriberUrl, this.responseSubject);
    } else {
      this._appStompclient.connect(this.url)
        .then(connectionResult => {
          if (connectionResult) {
            this._appStompclient.send(this.sendUrl, itemRequest);
            this._appStompclient.subscribe(this.subscriberUrl, this.responseSubject);
          }
        })
        .catch(err => {
          console.log("error received: %s", JSON.stringify(err));
        })
    }
  }
}
