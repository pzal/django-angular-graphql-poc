import { Component, OnDestroy } from '@angular/core';
import { NbMenuService, NbThemeService, NbDialogService } from '@nebular/theme';
import { EditItemDialogComponent } from './edit-item-dialog/edit-item-dialog'
import { map, takeUntil, filter } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

export const ITEMS_QUERY = gql`
          {
            allItems {
              id
              name
              accessLevel
            }
          }
        `

type Item = {
  id: string;
  name: string;
  accessLevel: number;
};

type Response = {
  allItems: Item[],
  loading: boolean,
  errors: any,
};

@Component({
  selector: 'ngx-items',
  styleUrls: ['./items.component.scss'],
  templateUrl: './items.component.html',
})
export class ECommerceItemsComponent {

  items: Item[] = [];
  loading = true;
  errors: any;

  type = 'month';
  types = ['week', 'month', 'year'];

  ctxItems = [
    { title: 'Edit', type: 'edit', component: 'my-comp' },
    { title: 'Lorem ipsum', type: 'loremipsum', component: 'my-comp' }
  ];

  constructor(private apollo: Apollo, private menuService: NbMenuService, private dialogService: NbDialogService) {
  }

  ngOnInit() {
    this.apollo
      .watchQuery<Response>({
        errorPolicy: 'all',
        query: ITEMS_QUERY,
      })
      .valueChanges
      .subscribe(({ data, loading, errors }) => {
        console.log('here', data, loading, errors)
        this.items = data && data.allItems;
        this.loading = loading;
        this.errors = errors;
      });

    this.menuService.onItemClick()
      .pipe(
        filter(({ item: { component } }) => component === 'my-comp'),
        filter(({ item: {type} }) => type === 'edit'),
        map(({ tag }) => tag),
      )
      .subscribe(id => {
        console.log(`ID ${id} was clicked!`)
        this.dialogService.open(EditItemDialogComponent, { context: { itemId: id } })
      });
  }
}
