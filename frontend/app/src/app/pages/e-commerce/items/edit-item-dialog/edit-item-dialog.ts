import { Component, OnDestroy, Input } from '@angular/core';
import { NbMenuService, NbThemeService, NbDialogService } from '@nebular/theme';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormBuilder } from '@angular/forms';

const changeItemAccessLevel = gql`
  mutation changeItemAccessLevel($id: ID!, $accessLevel: Int!) {
    changeItemAccessLevel(input: {id: $id, accessLevel: $accessLevel}) {
      item {
        id
      }
    }
  }
`;



@Component({
  selector: 'edit-item-dialog',
  styleUrls: ['./edit-item-dialog.scss'],
  templateUrl: './edit-item-dialog.html',
})
export class EditItemDialogComponent {
  @Input() itemId: string;
  changeItemForm;

  constructor(private apollo: Apollo, private formBuilder: FormBuilder) {
    this.changeItemForm = this.formBuilder.group({
      name: '',
      accessLevel: '1',
    })
  }

  changeItem(name: string, accessLevel: number) {
    console.log('mutating')
    this.apollo.mutate({
      mutation: changeItemAccessLevel,
      variables: {
        id: this.itemId,
        accessLevel,
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  onSave (itemData) {
    console.log('submitted with', itemData)
    this.changeItem(itemData.name, parseInt(itemData.accessLevel))
  }
}
