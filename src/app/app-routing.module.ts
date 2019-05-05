import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventCreate} from './events/components/edit/create';
import {EventUpdate} from './events/components/edit/update';
import {EventsListView} from './events/components/view/list';
import {Error404Page} from './main/error.404';
import {StartPage} from './main/start.page';

const routes: Routes = [
    {
        path: 'main',
        component: StartPage,
        children: [
            {
                path: 'list',
                component: EventsListView
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'list'
            },
        ]
    },
    {
        path: 'event/create',
        component: EventCreate
    },
    {
        path: 'event/update/:id',
        component: EventUpdate
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/main'
    },
    {
        path: '**',
        component: Error404Page
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
