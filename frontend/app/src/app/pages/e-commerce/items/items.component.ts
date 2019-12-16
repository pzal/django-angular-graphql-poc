import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


type Item = {
  name: string;
  accessLevel: number;
};

type Response = {
  allItems: Item[],
  loading: boolean,
  error: any,
};

@Component({
  selector: 'ngx-items',
  styleUrls: ['./items.component.scss'],
  templateUrl: './items.component.html',
})
export class ECommerceItemsComponent {

  items: Item[] = [];
  loading = true;
  error: any;

  type = 'month';
  types = ['week', 'month', 'year'];

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo
      .watchQuery<Response>({
        query: gql`
          {
            allItems {
              name
              accessLevel
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        console.log(result)
        this.items = result.data && result.data.allItems;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
