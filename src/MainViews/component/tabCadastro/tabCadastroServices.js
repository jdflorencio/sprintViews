const TabCadastroService = 'cadastroService'
angular.module(TabCadastroService, [])
.factory('TabCadastroService', function($http){

    const services = {}

    services.getAll = function() {
      return {
          msg: "De Servicos", 
          status: 200
      }
    }
    return services    
})

export default TabCadastroService