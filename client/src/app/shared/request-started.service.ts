import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class RequestStartedService {
  private requestStartedSubj = new Subject<any>();

  public requestStartedChanges$: Observable<any> = this.requestStartedSubj.asObservable();

  tellRequest(mRequestItem: any) {
    this.requestStartedSubj.next(mRequestItem);
  }
}
