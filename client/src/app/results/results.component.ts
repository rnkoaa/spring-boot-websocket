import {Component, OnInit, OnDestroy, Input} from "@angular/core";
import {RequestStartedService} from "../shared/request-started.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  subscription: Subscription;
  @Input() mRequestItem: any;

  constructor(private _requestStartedSvc: RequestStartedService) {
  }

  ngOnInit() {
    this.subscription = this._requestStartedSvc
      .requestStartedChanges$
      .subscribe((mRequestItem: any) => {
        console.log("Received Message. %s", JSON.stringify(mRequestItem));
        if (mRequestItem) {
          console.log(`Result => ${JSON.stringify(mRequestItem)}`);
        }
      });
  }

}
