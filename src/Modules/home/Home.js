import template from './Home.html'

function HomeController($http, HomeService, $state, $scope, $mdDialog) {
  self = this

  HomeService.getAll()

  self.irPara = function(sprint){
    $state.go('sprint')
  }

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


    const prompt = $mdDialog.prompt()
      .title('Adicionar Nova Sprint?')
      // .textContent('Insira o link da SPRINT')
      .placeholder('Digite Aqui')
      // .ariaLabel('Digite')
      .placeholder('exemple? "https://trello.com"')
      .targetEvent(ev)
      .required(true)
      .ok('ok')
      .cancel('Cancelar')

    $mdDialog.show(prompt).then(function (URL) {

      HomeService.getJson(URL)
      

      
  
    }, function () {
      console.log('DESISTIU!')
    })
  }



}

export const HomeComponent = {
  controller: HomeController,
  controllerAs: 'ctrl',
  template
}