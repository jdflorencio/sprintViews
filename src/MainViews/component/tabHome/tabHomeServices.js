const TabHomeService = 'tabHomeService'
angular.module(TabHomeService, [])
.factory('TabHomeService', function($http){

    const services = {}

    services.getAll = function() {
      return {
          msg: "De Servicos", 
          status: 200
      }
    }
    return services    
})

export default TabHomeService