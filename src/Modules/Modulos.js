import angular from 'angular'

import {HomeComponent} from './home/Home'
import HomeService from './home/HomeServices'

import {SprintComponent} from './sprint/Sprint'
import SprintService from './sprint/SprintServices'

import {StaticsComponent} from './statics/Statics'
import StaticsService from './statics/StaticsServices'

import SubModulos from './subModules/SubModulos'
const Modulos = 'modulos'
angular.module(Modulos, [
    SubModulos,
    HomeService,
    SprintService,
    StaticsService
    
])
.component('home', HomeComponent)
.component('sprint', SprintComponent)
.component('statics', StaticsComponent)
export default Modulos