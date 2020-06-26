import angular from 'angular'

import {HomeComponent} from './home/Home'
import HomeService from './home/HomeServices'

import {SprintComponent} from './sprint/Sprint'
import SprintService from './sprint/SprintServices'

import {StasticsComponent} from './stastics/Stastics'


const Modulos = 'modulos'
angular.module(Modulos, [
    HomeService,
    SprintService,
    
    
])
.component('home', HomeComponent)
.component('sprint', SprintComponent)
.component('stastics', StasticsComponent)
export default Modulos