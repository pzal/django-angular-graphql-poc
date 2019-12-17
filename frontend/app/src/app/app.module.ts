/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import {
  HttpBatchLinkModule,
  HttpBatchLink,
} from 'apollo-angular-link-http-batch';
import {
  NbChatModule,
  NbDatepickerModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbDialogModule,
} from '@nebular/theme';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpBatchLinkModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ApolloModule,
    HttpLinkModule,

    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpBatchLink) => {
      return {
        cache: new InMemoryCache({
          cacheRedirects: {
            Query: {
              item: (_, args, { getCacheKey }) =>
                getCacheKey({ __typename: 'ItemType', id: args.id })
            },
          }
        }),
        link: httpLink.create({
          uri: "http://localhost:8000/management/",
          batchInterval: 50,
        }),
        defaultOptions: {
          watchQuery: {
            errorPolicy: 'none'
          }
        }
      }
    },
    deps: [HttpBatchLink]
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
