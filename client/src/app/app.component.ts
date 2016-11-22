import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
import * as SockJS from "sockjs-client";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {FooterComponent} from "./footer/footer.component";
//import * as Stomp from 'stompjs';
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

  // @Output() migrationRequestStarted = new EventEmitter();
  requestItems: FormGroup;
  requestStarted: boolean;


  constructor(private _formBuilder: FormBuilder) {
  }

  @Output() onRequestStarted = new EventEmitter();

  ngOnInit() {

    this.requestItems = this._formBuilder.group({
      artifacts: [null, []]
    });
  }

  onRequestItemSubmitted(event) {

    this.requestStarted = true;
    console.log(this.requestItems.value);
    // this.migrationRequestStarted.emit("Request Started");
    //event.preventDefault();
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
