import { Component, OnDestroy, Input } from '@angular/core';
import { NbMenuService, NbThemeService, NbDialogService } from '@nebular/theme';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormBuilder } from '@angular/forms';
import {ITEMS_QUERY} from '../items.component'
import {USERS_QUERY} from '../../users/users.component'

const changeItemAccessLevel = gql`
  mutation ChangeItemAccessLevel($id: ID!, $accessLevel: Int!) {
    changeItemAccessLevel(input: {id: $id, accessLevel: $accessLevel}) {
      item {
        id
        name
        accessLevel
      }
    }
  }
`;

type Response = {
  item: Item,
  loading: boolean,
  errors: any,
};


type Item = {
  id: string;
  name: string;
  accessLevel: number;
};

@Component({
  selector: 'edit-item-dialog',
  styleUrls: ['./edit-item-dialog.scss'],
  templateUrl: './edit-item-dialog.html',
})
export class EditItemDialogComponent {
  @Input() itemId: string;
  name: string;
  accessLevel: string;
  
  loading = true;
  changeItemForm;
  errors: any;

  constructor(private apollo: Apollo, private formBuilder: FormBuilder) {
  }

  changeItem(name: string, accessLevel: number) {
    console.log('mutating')
    this.apollo.mutate({
      mutation: changeItemAccessLevel,
      variables: {
        id: this.itemId,
        accessLevel,
      },
      optimisticResponse: {
        changeItemAccessLevel: {
          __typename: 'ChangeItemAccessLevel',
          item: {
            __typename: 'ItemType',
            id: this.itemId,
            name,
            accessLevel,
          }
        },
      },
      refetchQueries: [{query: ITEMS_QUERY}, {query: USERS_QUERY}],
      // update: (store, { data: { submitComment } }) => {
      //   // Read the data from our cache for this query.
      //   const data = store.readQuery({ query: ITEMS_QUERY });
      //   // Add our comment from the mutation to the end.
      //   data.allItems = data.allItems.filter(item => item);
      //   // Write our data back to the cache.
      //   store.writeQuery({ query: CommentAppQuery, data });
      // },
    }).subscribe(({ data }) => {
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  ngOnInit() {
    this.apollo
      .watchQuery<Response>({
        query: gql`
          query item($id: String!) {
            item(id: $id) {
              id
              name
              accessLevel
            }
          }
        `,
        variables: {
          id: this.itemId
        }
      })
      .valueChanges
      .subscribe(({ data, loading, errors }) => {
        console.log('received', data)
        const item = data && data.item;
        this.name = item.name
        this.accessLevel = item.accessLevel.toString()
        // this.changeItemForm.setValue({
        //   name: this.item.name,
        //   accessLevel: this.item.accessLevel.toString(),
        // })
        this.loading = loading;
        this.errors = errors;
      });
  }

  onSave(itemData) {
    // console.log('submitted with', itemData)
    this.changeItem(this.name, parseInt(this.accessLevel))
  }
}
