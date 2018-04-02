import { Routes, RouterModule } from '@angular/router';

import { VehicleFormComponent } from './dashboard/components/new/vehicle/vehicle-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatatableComponent } from './dashboard/components/datatable/datatable.component';
import { UserComponent } from './dashboard/components/user/user.component';
import { MarkComponent } from './dashboard/components/new/mark/mark.component';
import { ModelComponent } from './dashboard/components/new/model/model.component';
import { ManageModelsComponent } from './dashboard/components/manage/manage-models/manage-models.component';
import { ManageMarksComponent } from './dashboard/components/manage/manage-marks/manage-marks.component';
import { ManageClientsComponent } from './dashboard/components/manage/manage-clients/manage-clients.component';
import { ManageUsersComponent } from './dashboard/components/manage/manage-users/manage-users.component';
import { SettingsComponent } from './dashboard/components/settings/settings.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './authentication/_guards/auth.guard';
import { PermissionsGuard } from './authentication/_guards/permissions.guard';
import { PageNotFoundComponent } from './dashboard/components/common/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'new/vehicle', component: VehicleFormComponent, canActivate: [PermissionsGuard] },
            { path: 'data', component: DatatableComponent },
            { path: 'data/:id', component: UserComponent, canActivate: [PermissionsGuard] },
            { path: 'manage/models', component: ManageModelsComponent },
            { path: 'manage/marks', component: ManageMarksComponent },
            { path: 'manage/clients', component: ManageClientsComponent },
            { path: 'manage/users', component: ManageUsersComponent, canActivate: [PermissionsGuard] },
            { path: 'settings', component: SettingsComponent }
        ],
    },
    { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [
];

export const routing = RouterModule.forRoot(routes);
