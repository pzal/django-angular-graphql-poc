import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
  NbMenuModule,
  NbContextMenuModule,
  NbDialogModule,
  NbInputModule,
  NbDialogService
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { ECommerceComponent } from './e-commerce.component';
import { ProfitCardComponent } from './profit-card/profit-card.component';
import { ECommerceChartsPanelComponent } from './charts-panel/charts-panel.component';
import { OrdersChartComponent } from './charts-panel/charts/orders-chart.component';
import { ProfitChartComponent } from './charts-panel/charts/profit-chart.component';
import { ChartPanelHeaderComponent } from './charts-panel/chart-panel-header/chart-panel-header.component';
import { ChartPanelSummaryComponent } from './charts-panel/chart-panel-summary/chart-panel-summary.component';
import { ChartModule } from 'angular2-chartjs';
import { StatsBarAnimationChartComponent } from './profit-card/front-side/stats-bar-animation-chart.component';
import { StatsCardFrontComponent } from './profit-card/front-side/stats-card-front.component';
import { ECommerceLegendChartComponent } from './legend-chart/legend-chart.component';
import { ECommerceUserActivityComponent } from './user-activity/user-activity.component';
import { ECommerceItemsComponent } from './items/items.component';
import { EditItemDialogComponent } from './items/edit-item-dialog/edit-item-dialog';
import { ECommerceUsersComponent } from './users/users.component';
import { ECommerceProgressSectionComponent } from './progress-section/progress-section.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbInputModule,
    NbListModule,
    NbMenuModule,
    NbContextMenuModule,
    ChartModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
    NbDialogModule.forChild(),
    ReactiveFormsModule,
  ],
  declarations: [
    ECommerceComponent,
    StatsCardFrontComponent,
    StatsBarAnimationChartComponent,
    ProfitCardComponent,
    ECommerceChartsPanelComponent,
    ChartPanelHeaderComponent,
    ChartPanelSummaryComponent,
    OrdersChartComponent,
    ProfitChartComponent,
    ECommerceLegendChartComponent,
    ECommerceUserActivityComponent,
    ECommerceItemsComponent,
    ECommerceUsersComponent,
    ECommerceProgressSectionComponent,
    EditItemDialogComponent
  ],
  entryComponents: [EditItemDialogComponent],
  providers: [
    NbDialogService,
  ],
})
export class ECommerceModule { }
