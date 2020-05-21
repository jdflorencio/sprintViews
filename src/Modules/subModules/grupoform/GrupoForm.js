import template from './GrupoForm.html'

function GrupoFormController(GrupoFormService, $state, $stateParams) {
    self = this
    self.grupo = {}
    const urlParams = Number.isInteger(parseInt($stateParams.add))

    self.actions = {
        salvar: false,
        adicionar: false
    }

    switch (urlParams) {
        case true:
            console.warn('editando')
            self.actions.salvar = true
            break
        case false:
            self.actions.adicionar = true
            break
    }

    self.salvar = function() {
        GrupoFormService
    }

    self.adicionar = function() {
        GrupoFormService.adicionar()
    }

    self.back = function () {
        $state.go('grupo')
    }
}

export const GrupoFormComponent = {
    controller: GrupoFormController,
    controllerAs: 'ctrl',
    template
}