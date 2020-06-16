import angular from 'angular'

import {HomeComponent} from './home/Home'
import HomeService from './home/HomeServices'

import {SprintComponent} from './sprint/Sprint'
import SprintService from './sprint/SprintServices'

import {StasticsComponent} from './stastics/Stastics'
import StasticsService from './stastics/StasticsServices'

const Modulos = 'modulos'
angular.module(Modulos, [
    HomeService,
    SprintService,
    StasticsService
    
])
.component('home', HomeComponent)
.component('sprint', SprintComponent)
.component('statics', StasticsComponent)
export default Modulos