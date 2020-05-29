import {
  database
} from './../../firebase'

const HomeService = 'homeService'
angular.module(HomeService, []).factory('HomeService', function ($http, $firebaseArray) {

  const services = {}

  services.getAll = function () {
    database.ref('scrum/sprints').on()
  }

  const addSprint = function (data) {

    const {
      cards,
      sprints,
      tamanho,
      complexidade,
      situacao
    } = data
    database.ref('scrum/cards').update(cards)
    database.ref('scrum/sprints').update(sprints)
    database.ref('scrum/config').update(tamanho)
    database.ref('scrum/config').update(complexidade)
    database.ref('scrum/config').update(situacao)
  }

  const addMembers = function (members) {
    const members_registered = database.ref('members')
    let found = $firebaseArray(members_registered)


    database.ref('members').set({
      members
    });
  }



  services.getJson = function (url) {
    return $http.get(url)
      .then(result => {
        if (result.status == 200) {

          const cabecalho = {
            // id: result.data.id,
            name: result.data.name,
            // desc: result.data.desc,
            descData: result.data.descData,
            closed: result.data.closed,
            idOrganization: result.data.idOrganization,
            shortLink: result.data.shortLink,
            // powerUps: result.data.powerUps,
            // dateLastActivity: result.data.dateLastActivity,
            // idTags: result.data.idTags,
            // datePluginDisable: result.data.datePluginDisable,
            // creationMethod: result.data.creationMethod,
            // idBoardSource: result.data.idBoardSource,
            // idEnterprise: result.data.idEnterprise,
            // pinned: result.data.pinned,
            // starred: result.data.starred,
            // url: result.data.url,
            shortUrl: result.data.shortUrl,
            // ixUpdate: result.data.ixUpdate
          }

          const {
            cards,
            members,
            customFields,
            prefs,
            actions,
            labels,
            lists,
            checklists,
            limits,
            labelNames
          } = result.data

          const data = {}
          const sprint = {}
          const listcards = {}

          sprint[`${cabecalho.name}`] = {
            titulo: cabecalho.name,
            link: cabecalho.shortUrl,
            totalPesos: 50

          }

          data.sprints = sprint

          /* MEMBROS DA SPRINT */
          // const dataMembers = []
          // members.map(member => {
          //   dataMembers.push({id: member.id, nome: member.fullName})

          // })

          const cardsCustum = []
          const totalCustomFilds = []
          listcards[`${cabecalho.name}`] = cardsCustum

          const tamanhoValues = {
            "PP": 0.5,
            "P": 1.5,
            "M": 2.5,
            "G": 4,
            "GG": 6,
            "EG": 6
          }

          const tamanho = []
          customFields[1].options.map(item => {
            tamanho.push({
              id: item.id,
              idCustumFiel: item.idCustomField,
              descricao: item.value.text,
              valor: tamanhoValues[item.value.text]
            })
          })

          const complexidade = []
          customFields[0].options.map(item => {
            complexidade.push({
              id: item.id,
              idCustumFiel: item.idCustomField,
              descricao: item.value.text,
              valor: item.value.text
            })
          })

          data.tamanho = {
            tamanho
          }
          data.complexidade = {
            complexidade
          }

          const situacao = {}

          lists.map(list => {
            const name = list.name.split(' ')[0]

            situacao[`${name}`] = [{
              id: list.id,
              descricao: list.name
            }]
          })

          complexidade.map(comp => {
            totalCustomFilds.push(comp)
          })

          tamanho.map(tam => {
            totalCustomFilds.push(tam)
          })

          // return false

          // *** motando o card
          cards.map(card => {
            const participantes = []

            // PARTICIPANTES DOS CARDS
            card.idMembers.map(member => {
              members.filter(mem => {
                if (member == mem.id) {
                  participantes.push({
                    id: mem.id,
                    nome: mem.fullName
                  })
                }
              })
            })

            let situacaoValue = lists.filter(list => {
              if (card.idList == list.id)
                return list.name
            })



            const field = {}
            const fieldCustom = card.customFieldItems.map(item => {

              if (item.idValue) {
                const valorEncontrado = totalCustomFilds.filter(field => {

                  return field.idCustumFiel == item.idCustomField && field.id == item.idValue
                })


                if (Number.isInteger(parseInt(valorEncontrado[0].descricao))) {

                  field.peso = valorEncontrado[0].descricao
                } else if (!Number.isInteger(parseInt(valorEncontrado[0].descricao)) && valorEncontrado[0].descricao != void 0) {

                  field.complexidade = valorEncontrado[0].descricao
                }
              }

            })

            cardsCustum.push({
              titulo: card.name,
              descricao: card.desc,
              link: card.shortUrl,
              complexidade: field.complexidade || '',
              peso: field.peso || '',
              situacao: situacaoValue[0].name.split(' ')[0],
              tamanho: 0,
              participantes
            })
          })

          data.cards = listcards
          data.situacao = {
            situacao
          }

          // console.log(data)

          addSprint(data)
        }
      })
      .catch(err => {
        console.warn(err)
      })
  }


  return services
})

export default HomeService