import template from './ExempleForm.html'


function ExempleController(ExempleFormService, $state, $stateParams) {
    self = this
    let parametroId

    self.exibir_view = {
        btn_editar: false,
        btn_salvar: false,
        btn_excluir: false,
        inputs: true

    }

    ExempleFormService.ufs()

    const urlParams = Number.isInteger(parseInt($stateParams.id))
        || Number.isInteger(parseInt($stateParams.visualizando))

    const tipo_visualizacao = Object.keys($stateParams)
        .find(param => {
            return param == "id" || param == "visualizando"
        })

    switch (urlParams) {
        case true:
            parametroId = $stateParams[tipo_visualizacao]

            switch (tipo_visualizacao) {
                case "id":
                    self.title = "Editar Cidade"
                    self.button_text = "Atualizar"
                    self.exibir_view.btn_salvar = true
                    self.exibir_view.inputs = false

                    break
                case "visualizando":
                    self.title = "Visualizado o cadastro de cidades"
                    self.exibir_view.btn_editar = true
                    self.exibir_view.btn_excluir = true

                    break
            }
            ExempleFormService.getOne(parametroId)
            break
        default:
            $state.go('cidade_adicionar')
            self.exibir_view.btn_salvar = true
            self.exibir_view.inputs = false
            self.title = "Adicionar Cidade"
            self.button_text = "Salvar"
    }
}

export const ExempleForm = {
    controller: ExempleController,
    controllerAs: 'ctrl',
    template
}