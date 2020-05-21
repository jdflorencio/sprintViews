import angular from 'angular'
const SubModulos = 'submodel'
import {
    GrupoFormComponent
} from './grupoform/GrupoForm'

import GrupoFormServices  from './grupoform/GrupoFormServices'

angular.module(SubModulos, [
    GrupoFormServices

    ])

    .component('grupoform', GrupoFormComponent)

export default SubModulos