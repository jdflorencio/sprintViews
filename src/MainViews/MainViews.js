import angular from 'angular'
// import {HomeComponent} from './home/Home'
// import HomeService from './home/HomeServices'

import {LoginComponent} from './login/Login'
import LoginService from './login/LoginServices'


const Views = 'views'

angular.module(Views, [
    // HomeService,
    LoginService,
    
])
// .component('home', HomeComponent)
.component('login', LoginComponent)



export default Views