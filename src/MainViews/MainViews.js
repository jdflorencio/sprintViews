import angular from 'angular'
import {HomeComponent} from './home/Home'
import HomeService from './home/HomeServices'

import {LoginComponent} from './login/Login'
import LoginService from './login/LoginServices'

import {TabHomeComponent} from './component/tabHome/tabHome'
import {TabCadastroComponent} from './component/tabCadastro/tabCadastro'
import TabCadastroService from './component/tabCadastro/tabCadastroServices'

const Views = 'views'

angular.module(Views, [
    HomeService,
    LoginService,
    TabCadastroService    
])
.component('home', HomeComponent)
.component('login', LoginComponent)

// component das tab
.component('tabHome', TabHomeComponent)
.component('tabCadastro', TabCadastroComponent)

export default Views