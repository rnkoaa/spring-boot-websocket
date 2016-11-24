import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
import * as SockJS from "sockjs-client";
import {RequestStartedService} from "./shared/request-started.service";

const Stomp = require('stompjs/lib/stomp').Stomp;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private host = 'http://localhost:8012';
  //private url = `${this.host}/migrations`;
  private url = `/hello`;
  // private subscriberUrl = `/topic/migrations`;
  private subscriberUrl = `'/user/topic/greetings'`;
  private sendUrl = `/app/hello`;
  public stompClient: any;

  /*ngOnInit(): void {
   // this.connect();
   }
   */

  mRequest: FormGroup;
  mRequestItem: any;
  public requestStarted: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _requestStartedSvc: RequestStartedService) {
  }

  ngOnInit() {

    this.mRequest = this._formBuilder.group({
      artifacts: [null, []]
    });

  }

  onRequestSubmitted(event) {

    this.requestStarted = true;
    this.mRequestItem = this.mRequest.value;
    console.log(this.mRequestItem);
    this._requestStartedSvc.tellRequest(this.mRequestItem);
  }

  connect() {
    const that = this;
    const socket = new SockJS(this.url);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      that.stompClient.subscribe(that.subscriberUrl, (greeting) => {
        console.log("Received Message");
        console.log(greeting.body);
      });
    }, (err) => {
      console.log('err', err);
    });
  }

  /*  public send(event) {
   this.stompClient.send(this.sendUrl, {},  JSON.stringify({'name': name}));

   }*/

}
