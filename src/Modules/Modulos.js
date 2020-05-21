import angular from 'angular'

import {HomeComponent} from './home/Home'
import HomeService from './home/HomeServices'

import {GrupoComponent} from './grupo/Grupo'
import GrupoService from './grupo/GrupoServices'

import {SubGrupoComponent} from './subGrupo/SubGrupo'
import SubGrupoService from './subGrupo/SubGrupoServices'

import SubModulos from './subModules/SubModulos'

const Modulos = 'modulos'

angular.module(Modulos, [
    SubModulos,
    HomeService,
    GrupoService,
    SubGrupoService
])

.component('home', HomeComponent)
.component('grupo', GrupoComponent)
.component('subgrupo', SubGrupoComponent)

export default Modulos