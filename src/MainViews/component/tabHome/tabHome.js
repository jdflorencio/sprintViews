import template from './tabHome.html'

function TabHomeController($http, $state, $scope) {
  self = this
  // self.tabHome = TabHome
  // TabHomeService.getAll()

  $scope.labels = ["Cachos", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 500, 100, 300,1, 10 ]

}

export const TabHomeComponent = {
  controller: TabHomeController,
  controllerAs: 'ctrl',
  template
}