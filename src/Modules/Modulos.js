import angular from 'angular'

import {GrupoComponent} from './grupo/Grupo'
import GrupoService from './grupo/GrupoServices'

import {SubGrupoComponent} from './subGrupo/SubGrupo'
import SubGrupoService from './subGrupo/SubGrupoServices'

import SubModulos from './subModules/SubModulos'

const Modulos = 'modulos'

angular.module(Modulos, [
    SubModulos,
    GrupoService,
    SubGrupoService
])

.component('grupo', GrupoComponent)
.component('subgrupo', SubGrupoComponent)

export default Modulos