import { Routes, RouterModule } from '@angular/router';

import { VehicleFormComponent } from './form/vehicle-form/vehicle-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatatableComponent } from './dashboard/components/datatable/datatable.component';
import { UserComponent } from './dashboard/components/user/user.component';
import { MarkComponent } from './dashboard/components/new/mark/mark.component';
import { ModelComponent } from './dashboard/components/new/model/model.component';
import { ManageModelsComponent } from './dashboard/components/manage/manage-models/manage-models.component';
import { ManageMarksComponent } from './dashboard/components/manage/manage-marks/manage-marks.component';
import { ManageClientsComponent } from './dashboard/components/manage/manage-clients/manage-clients.component';
import { ManageUsersComponent } from './dashboard/components/manage/manage-users/manage-users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './authentication/_guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard/data', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'new/vehicle', component: VehicleFormComponent },
            { path: 'data', component: DatatableComponent },
            { path: 'data/:id', component: UserComponent },
            { path: 'new/mark', component: MarkComponent },
            { path: 'new/model', component: ModelComponent },
            { path: 'manage/models', component: ManageModelsComponent },
            { path: 'manage/marks', component: ManageMarksComponent },
            { path: 'manage/clients', component: ManageClientsComponent },
            { path: 'manage/users', component: ManageUsersComponent }
        ],
    },
    { path: '**', redirectTo: 'dashboard/data', pathMatch: 'full', canActivate: [AuthGuard] }

];

export const appRoutingProviders: any[] = [
];

export const routing = RouterModule.forRoot(routes);
