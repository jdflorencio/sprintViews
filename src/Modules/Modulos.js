import angular from 'angular'

import {HomeComponent} from './home/Home'
import HomeService from './home/HomeServices'

import {SprintComponent} from './sprint/Sprint'
import SpritServices from './sprint/SprintServices'

import SubModulos from './subModules/SubModulos'
const Modulos = 'modulos'
angular.module(Modulos, [
    SubModulos,
    HomeService,
    SpritServices
    
])
.component('home', HomeComponent)
.component('sprint', SprintComponent)
export default Modulos