import template from './Grupo.html'

function GrupoController($http, GrupoService, $state, $mdDialog, $scope) {
    self = this

    GrupoService.getAll()

    $scope.status = '  ';
    $scope.customFullscreen = false;


    $scope.showAlert = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('This is an alert title')
            .textContent('You can specify some description text in here.')
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
        );
    };

    self.showConfirm = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        const confirm = $mdDialog.confirm()
            .title('Deseja excluir?')
            .textContent('Tem certeza que deseja apagar os itens selecionados?')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Excluir')
            .cancel('Cancelar')

        const alert = $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title(':( Ops! Algo deu errado ')
            .textContent('Selecione um item para excluir.')
            .ariaLabel('Alert Dialog Demo')
            .ok('Ok')
            .targetEvent(ev)




        $mdDialog.show(confirm).then(function () {
            $scope.status = 'You decided to get rid of your debt.';
        }, function () {
            $scope.status = 'You decided to keep your debt.';
        });
    };


    // self.marcadosPraRemover = self.grupos


    self.adicionar = function () {
        $state.go('grupoform-add')
    }

    self.irEditar = function (id, event) {
        // console.log(id, event)
        $state.go('grupoform-edit', {
            add: id
        })
    }

    self.back = function () {
        $state.go('home')
    }

    self.removerSelecionados = function () {

    }
}

export const GrupoComponent = {
    controller: GrupoController,
    controllerAs: 'ctrl',
    template
}