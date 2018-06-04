import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListPage } from '../pages/list/list';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { Events } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  userProfile: any;
  pages: Array<{ title: string, component: any }>;
  userType: any = window.localStorage.getItem('type');
  userImage: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private menuController: MenuController, private events: Events) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString('#f06987');
      this.splashScreen.hide();
      if (window.localStorage.getItem('token')) {
        this.userProfile = JSON.parse(window.localStorage.getItem('userProfile'));
        if(this.userProfile.profile_image){
          this.userImage = `http://elfarahapp.com${this.userProfile.profile_image}`
        } else {
          this.userImage = 'https://www.worldcrunch.com/assets/img/avatars/thumbnails/default-user-img-profile.jpg';
        }
        console.log(this.userProfile);
        this.userType = window.localStorage.getItem('type');
        if (this.userType == 'vendor') {
          console.log('vendor');
          this.rootPage = 'DashboardPage';
          this.pages = [
            { title: 'Dashboard', component: 'DashboardPage' },
            { title: 'Orders', component: 'OrdersPage' },
            { title: 'Packages', component: 'PackagesPage' },
            { title: 'Statistics', component: 'StatisticsPage' },
            { title: 'Contact Us', component: 'ContactUsPage' }
          ];
        } else if (this.userType == 'user') {
          console.log('user');
          this.rootPage = 'CategoriesPage';
          this.pages = [
            { title: 'Categories', component: 'CategoriesPage' },
            { title: 'My Plans', component: 'MyPlansPage' }
          ]
        } else {
          this.pages = [
            { title: 'Categories', component: 'CategoriesPage' },
            { title: 'Login', component: 'LoginPage' },
            { title: 'Register', component: 'SignUpPage' }
          ]
        }
      }
      else this.rootPage = 'IntroPage';
    });
    this.events.subscribe('user:login', (type) => {
      this.userProfile = JSON.parse(window.localStorage.getItem('userProfile'));
      console.log(this.userProfile);
      if (this.userProfile.profile_image) {
        this.userImage = `http://elfarahapp.com${this.userProfile.profile_image}`;
      } else {
        this.userImage = 'https://www.worldcrunch.com/assets/img/avatars/thumbnails/default-user-img-profile.jpg';
      }
      console.log(type);
      if (type == 'vendor') {
        this.pages = [
          { title: 'Dashboard', component: 'DashboardPage' },
          { title: 'Orders', component: 'OrdersPage' },
          { title: 'Packages', component: 'PackagesPage' },
          { title: 'Statistics', component: 'StatisticsPage' },
          { title: 'Contact Us', component: 'ContactUsPage' }
        ];
      } else if (this.userType == 'user') {
        this.pages = [
          { title: 'Categories', component: 'CategoriesPage' },
          { title: 'My Plans', component: 'MyPlansPage' }
        ]
      } else {
        this.pages = [
          { title: 'Categories', component: 'CategoriesPage' },
          { title: 'Login', component: 'LoginPage' },
          { title: 'Register', component: 'SignUpPage' }
        ]
      }
    })
  }

  ngOnInit() {
    this.events.subscribe('user:login', (type) => {
      console.log('fireeeeeeeeeeeeeeed');
      console.log(type);
      if (type == 'vendor') {
        this.pages = [
          { title: 'Dashboard', component: 'DashboardPage' },
          { title: 'Orders', component: 'OrdersPage' },
          { title: 'Packages', component: 'PackagesPage' },
          { title: 'Statistics', component: 'StatisticsPage' },
          { title: 'Contact Us', component: 'ContactUsPage' }
        ];
      } else if (type == 'user') {
        this.pages = [
          { title: 'Categories', component: 'CategoriesPage' },
          { title: 'My Plans', component: 'MyPlansPage' }
        ]
      } else {
        this.pages = [
          { title: 'Categories', component: 'CategoriesPage' },
          { title: 'Login', component: 'LoginPage' },
          { title: 'Register', component: 'SignUpPage' }
        ]
      }
    })
  }

  logout() {
    window.localStorage.clear();
    this.nav.setRoot('IntroPage');
    this.platform.exitApp();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goToProfile() {
    this.nav.setRoot('ProfilePage');
    this.menuController.close();
  }
}
