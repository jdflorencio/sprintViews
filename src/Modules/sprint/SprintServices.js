const SprintService = 'sprintService'
angular.module(SprintService, [])
.factory('SprintService', function($http){

    const services = {}

    services.getAll = function() {
      return {
          msg: "De Servicos", 
          status: 200
      }
    }
    return services    
})

export default SprintService