import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Error404Page} from './main/error.404';
import {StartPage} from './main/start.page';

const routes: Routes = [
    {path: 'main', component: StartPage},
    {path: '', pathMatch: 'full', redirectTo: '/main'},
    {path: '**', component: Error404Page},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
