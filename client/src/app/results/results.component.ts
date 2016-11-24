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
  statusMessages: Array<any> = [];

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
        let message = JSON.parse(response);
        if(message.processingStatus){
          console.log("Processing is completed.");

          //disconnect for this websocket connection.
          this._itemRequestService.disconnect();
        }
        this.statusMessages.push(message);
      });

    this.subscription = this._requestStartedSvc
      .requestStartedChanges$
      .subscribe((mRequestItem: any) => {
        if (mRequestItem) {
          console.log(`Result => ${JSON.stringify(mRequestItem)}`);
          let mRequest = {
            artifacts: [mRequestItem.artifacts]
          };

          //reset status messages.
          this.statusMessages = [];

          this._itemRequestService.send(mRequest);
        }
      });
  }

}
