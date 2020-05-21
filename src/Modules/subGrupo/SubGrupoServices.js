const SubGrupoService = 'subGrupoService'
angular.module(SubGrupoService, [])
  .factory('SubGrupoService', function ($http) {

    const services = {}

    services.getAll = function () {
      return {
        msg: "De Servicos",
        status: 200
      }
    }
    return services
  })

export default SubGrupoService