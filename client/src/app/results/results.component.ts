import {Component, OnInit, OnDestroy, Input} from "@angular/core";
import {RequestStartedService} from "../shared/request-started.service";
import {Subscription} from "rxjs/Subscription";
import {ItemsRequestService} from "./items.request.service";


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.itemResponseSubscription.unsubscribe();
  }

  subscription: Subscription;
  itemResponseSubscription: Subscription;
  @Input() mRequestItem: any;

  constructor(private _requestStartedSvc: RequestStartedService,
              private _itemRequestService: ItemsRequestService) {
  }

  ngOnInit() {
    this.itemResponseSubscription = this._itemRequestService
      .responseObservable
      .subscribe(response => {
        console.log(`Received response from server: ${response}`);
      });

    this.subscription = this._requestStartedSvc
      .requestStartedChanges$
      .subscribe((mRequestItem: any) => {
        console.log("Received Message. %s", JSON.stringify(mRequestItem));
        if (mRequestItem) {
          console.log(`Result => ${JSON.stringify(mRequestItem)}`);
          let mRequest = {
            artifacts: [mRequestItem.artifacts]
          };

          this._itemRequestService.send(mRequest);
        }
      });
  }

}
