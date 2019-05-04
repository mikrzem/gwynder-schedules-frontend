import {OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {SubscribedComponent} from './subscribed';

export abstract class RoutedComponent extends SubscribedComponent implements OnInit {

    protected constructor(
        protected readonly route: ActivatedRoute
    ) {
        super();
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.route.params.subscribe(params => this.onParam(params))
        );
        this.subscriptions.push(
            this.route.queryParams.subscribe(query => this.onQuery(query))
        );
    }

    protected onParam(params: Params) {
    }

    protected onQuery(params: Params) {
    }
}
