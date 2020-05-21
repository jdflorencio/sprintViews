import template from './SubGrupo.html'

function SubGrupoController($http, SubGrupoService, $state) {
    self = this
    console.log('subGrupo')
    SubGrupoService.getAll()
    
    self.verCidades = function(){
        $state.go('cidade')
    }

    self.verPessoas = function(){
        $state.go('pessoa')
    }
}

export const SubGrupoComponent = {
    controller: SubGrupoController,
    controllerAs: 'ctrl',
    template
}