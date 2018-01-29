import { Routes, RouterModule } from '@angular/router';

import { VehicleFormComponent } from './form/vehicle-form/vehicle-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatatableComponent } from './dashboard/components/datatable/datatable.component';
import { UserComponent } from './dashboard/components/user/user.component';
import { MarkComponent } from './dashboard/components/new/mark/mark.component';
import { ModelComponent } from './dashboard/components/new/model/model.component';
import { ManageVehiclesComponent } from './dashboard/components/manage/manage-vehicles/manage-vehicles.component';
import { ManageClientsComponent } from './dashboard/components/manage/manage-clients/manage-clients.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard/data', pathMatch: 'full' },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: 'new/vehicle', component: VehicleFormComponent },
            { path: 'data', component: DatatableComponent },
            { path: 'data/:id', component: UserComponent },
            { path: 'new/mark', component: MarkComponent },
            { path: 'new/model', component: ModelComponent },
            { path: 'manage/vehicles', component: ManageVehiclesComponent },
            { path: 'manage/clients', component: ManageClientsComponent }
        ],
    },
    { path: '**', redirectTo: 'dashboard/data', pathMatch: 'full' }

];

export const appRoutingProviders: any[] = [
];

export const routing = RouterModule.forRoot(routes);
