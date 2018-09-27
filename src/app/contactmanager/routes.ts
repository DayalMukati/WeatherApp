import { ProductHistoryComponent } from './components/product-history/product-history.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { UserComponent } from './components/user/user.component';
import { Routes } from '@angular/router'


export const appRoutes: Routes = [

    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'history', component: ProductHistoryComponent
    },
    {
        path: 'update', component: ProductHistoryComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'more', component: ProductHistoryComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'home', component: ContactmanagerAppComponent,
        children: [{ path: 'history', component: ProductHistoryComponent },
        { path: 'delete', component: ProductHistoryComponent },
        { path: '', component: MainContentComponent }],
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }

];