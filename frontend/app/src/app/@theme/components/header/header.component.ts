import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { NbAuthService } from '@nebular/auth';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, filter} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';



@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  userMenu = [ { title: 'Profile', component: 'header', id: 'profile' }, { title: 'Log out', component: 'header', id: 'logout' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private authService: NbAuthService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private apollo: Apollo,
              private router: Router) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

      this.menuService.onItemClick()
        .pipe(
          filter(({ item: { component } }) => component === 'header'),
          filter(({ item: {id} }) => id === 'logout'),
        )
        .subscribe(() => {
          console.log('logging out')
          localStorage.removeItem('auth_app_token');
          this.apollo.getClient().clearStore()
          this.apollo.getClient().resetStore()
          // this.authService.logout('email')
          // this.router.navigateByUrl('/logout')
        });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
