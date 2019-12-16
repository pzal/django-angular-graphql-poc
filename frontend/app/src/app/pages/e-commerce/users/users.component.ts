import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


type User = {
  email: string;
  accessLevel: number;
};

type Response = {
  allUsers: User[],
  loading: boolean,
  error: any,
};

@Component({
  selector: 'ngx-users',
  styleUrls: ['./users.component.scss'],
  templateUrl: './users.component.html',
})
export class ECommerceUsersComponent {

  users: User[] = [];
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
            allUsers {
              email
              accessLevel
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        console.log(result)
        this.users = result.data && result.data.allUsers;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
