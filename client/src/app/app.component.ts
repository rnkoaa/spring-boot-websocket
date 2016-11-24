import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
import {RequestStartedService} from "./shared/request-started.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

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

}
