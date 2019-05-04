import {OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

export abstract class SubscribedComponent implements OnDestroy {

    protected subscriptions: Subscription[] = [];

    public ngOnDestroy(): void {
        for (let sub of this.subscriptions) {
            sub.unsubscribe();
        }
        this.subscriptions = [];
    }

}
