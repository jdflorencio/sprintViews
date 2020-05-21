import angular from 'angular'

import {HomeComponent} from './home/Home'
import HomeService from './home/HomeServices'

import SubModulos from './subModules/SubModulos'
const Modulos = 'modulos'
angular.module(Modulos, [
    SubModulos,
    HomeService
    
])
.component('home', HomeComponent)
export default Modulos