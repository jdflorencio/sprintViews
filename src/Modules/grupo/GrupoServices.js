const GrupoService = 'grupoService'
angular.module(GrupoService, [])
  .factory('GrupoService', function ($http, API, appService) {

    const services = {}

    services.getAll = function () {
      return $http.get(`${API}/grupo`)
      .then( result => {
        const {dados} = result.data
        self.grupos = dados
        self.marcadosPraRemover = self.grupos
        console.log(self.marcadosPraRemover)
      })
    }   

    return services
  })

export default GrupoService