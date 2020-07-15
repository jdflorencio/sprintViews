import {
  database
} from './../../firebase'

import moment from 'moment'
import 'moment/locale/pt-br'

const HomeService = 'homeService'
angular.module(HomeService, []).factory('HomeService', function ($firebaseObject) {
  moment.locale('pt-BR')
  const services = {}

  let pesoTotal = 0
  let qtd_situcao_concluido = 0
  let qtd_situacao_andamento = 0
  let qtd_situacao_backlog = 0
  let allParticipantes
  let all_labels
  let estatisticas_membros = []
  let label_por_sprint = {}
  let qtd_cards = 0

  const tamanhoValues = {
    "PP": 0.5,
    "P": 1.5,
    "M": 2.5,
    "G": 4,
    "GG": 6,
    "EG": 6
  }

  const optionsSituacao = {
    Retorno: 'Concluido',
    Teste: 'Concluido',
    Aguardando: 'Concluido',
    Concluido: 'Concluido',
    Publicado: 'Concluido',
    Bloqueado: 'Backlog',
    Backlog: 'Backlog',
    Andamento: 'Andamento',

  }

  const addSprint = function (data, current_sprint) {

    const {
      cards,
      sprints,
      tamanho,
      complexidade,
      situacao
    } = data

    cards[`${current_sprint}`].length

    database.ref('scrum/cards').update(cards)
    database.ref('scrum/sprints').update(sprints)
    database.ref('scrum/config').update(tamanho)
    database.ref('scrum/config').update(complexidade)
    database.ref('scrum/config').update(situacao)
    database.ref('scrum/statics/' + current_sprint).update(estatisticas_membros)

    database.ref('scrum/sprints').orderByChild("status").equalTo("aberto")
      .once('value', function (snapshot) {
        snapshot.forEach(child => {
          child.ref.update({
            status: 'fechado'
          })
        })
      })

    const ultimaSprint = $firebaseObject(database.ref('scrum/sprints').limitToLast(1))

    ultimaSprint.$loaded().then(result => {
      result.forEach(teste => {
        database.ref('scrum/sprints/' + teste.titulo).update({
          status: "aberto"
        })
      })
    })

    console.table(estatisticas_membros)
    pesoTotal = 0
    qtd_situcao_concluido = 0
    qtd_situacao_andamento = 0
    qtd_situacao_backlog = 0
    allParticipantes
    estatisticas_membros = []
    label_por_sprint = {}
    qtd_cards = 0
  }

  services.getJson = function (stringJson) {

    try {
      let obj = JSON.parse(stringJson)
      const cabecalho = {
        name: obj.name,
        descData: obj.descData,
        closed: obj.closed,
        idOrganization: obj.idOrganization,
        shortLink: obj.shortLink,
        shortUrl: obj.shortUrl,
      }

      const {
        cards,
        members,
        customFields,
        labels,
        lists,
        labelNames
      } = obj

      const data = {}
      const sprint = {}
      const listcards = {}

      const totalCustomFilds = []

      const tamanho = _tamanho(customFields[1].options)
      const complexidade = _complexidade(customFields[0].options)

      data.tamanho = {
        tamanho
      }
      data.complexidade = {
        complexidade
      }

      const situacao = {}
      lists.forEach(list => {
        if (list.name == 'Concluído') {
          list.name = list.name.replace('Concluído', 'Concluido')
        }

        const name = list.name.split(' ')[0]

        situacao[`${name}`] = [{
          id: list.id,
          descricao: list.name
        }]
      })

      complexidade.forEach(comp => {
        totalCustomFilds.push(comp)
      })

      tamanho.forEach(tam => {
        totalCustomFilds.push(tam)
      })

      allParticipantes = members
      all_labels = labels

      let cardsCustum = _criando_card(cards, lists, totalCustomFilds, labels)

      listcards[`${cabecalho.name}`] = cardsCustum

      /*CARD PRINCIPAL*/
      sprint[`${cabecalho.name}`] = {
        titulo: cabecalho.name,
        link: cabecalho.shortUrl,
        membros: members.length,
        totalcards: [
          qtd_situacao_backlog,
          qtd_situacao_andamento,
          qtd_situcao_concluido
        ],
        pesoTotal,
        mediaDev: (pesoTotal / members.length),
        mediaTarefa: (pesoTotal / cards.length),
        tarefas: qtd_cards,
        updateAt: `${moment().format('L')} ${moment().format('LT')}`,
        status: "fechado",
        label_por_sprint
      }

      data.sprints = sprint
      data.cards = listcards
      data.situacao = {
        situacao
      }

      addSprint(data, cabecalho.name)
      return true

    } catch (error) {
      console.warn(error)
      return error
    }
  }

  const _complexidade = function (comp) {
    try {
      const complexidade = comp.map(item => {
        return {
          id: item.id,
          idCustumFiel: item.idCustomField,
          descricao: item.value.text,
          valor: item.value.text
        }
      })

      return complexidade

    } catch (error) {
      console.warn(error)
      return error
    }
  }

  const _tamanho = function (tam) {
    try {
      const tamanho = tam.map(item => {
        return {
          id: item.id,
          idCustumFiel: item.idCustomField,
          descricao: item.value.text,
          valor: tamanhoValues[item.value.text]
        }
      })
      return tamanho
    } catch (error) {
      console.warn(error)
      return error
    }
  }

  const _participantes_cards = function (members) {
    try {
      const participantes = members.map(member => {
        const participante_encontrado = allParticipantes.filter(mem => {
          return member == mem.id
        })

        return {
          id: participante_encontrado[0].id,
          nome: participante_encontrado[0].fullName
        }
      })

      return participantes

    } catch (error) {
      console.warn(error)
      return error
    }
  }

  const _filtrar_descricao_correta_para_labels = function (descricao_label) {
    const relatorio = ["Debito tecnico", "Implementação", "bug", "Bug", "Melhoria"]

    try {

      const name_label = relatorio.find(rel => {
        return rel == descricao_label
      })

      let relatorio_name

      switch (name_label) {
        case relatorio[0]:
          relatorio_name = 'debito_tecnico'
          break
        case relatorio[1]:
          relatorio_name = 'implementacao'
          break
        case relatorio[2]:
          relatorio_name = 'bug'
          break
        case relatorio[3]:
          relatorio_name = 'bug'
          break
        case relatorio[4]:
          relatorio_name = 'melhoria'
          break
        default:
          return false
      }


      return relatorio_name

    } catch (error) {
      console.warn(error)
      return error
    }
  }

  const _contagem_label_por_card = function (array_labels, pontos) {
    try {
      array_labels.forEach(label => {
        let relatorio_name = _filtrar_descricao_correta_para_labels(label.name)

        if (!relatorio_name) {
          return false
        }

        if (label_por_sprint[`${relatorio_name}`] != void 0) {
          label_por_sprint[`${relatorio_name}`] += pontos
          return true
        }

        label_por_sprint[`${relatorio_name}`] = pontos

      })
    } catch (error) {
      console.warn(error)
      return error
    }
  }

  const _separa_participantes_estaticas = function (partipantes_array) {

    partipantes_array.forEach(mem => {
      const membro = {}
      const membroObject = estatisticas_membros.find(membro => {
        return membro.id === mem.id
      })


      if (membroObject == void 0) {
        

        membro.nome = mem.nome
        membro.id = mem.id
        estatisticas_membros.push(membro)
      }
    })
  }

  const _contagem_de_card_por_membro = function (array_membro, array_labels, pontos) {
    try {
      array_membro.forEach(mem => {
        const indexMembro = estatisticas_membros.findIndex(membro => {
          return membro.nome == mem.nome
        })

        array_labels.forEach(label => {
          let relatorio_name = _filtrar_descricao_correta_para_labels(label.name)

          if (!relatorio_name) {
            return false
          }

          if (estatisticas_membros[indexMembro][`${relatorio_name}`] == void 0) {
            estatisticas_membros[indexMembro][`${relatorio_name}`] = pontos
          } else {
            estatisticas_membros[indexMembro][`${relatorio_name}`] += pontos
          }

        })

        if (estatisticas_membros[indexMembro].total_pontos_dev != void 0) {
          estatisticas_membros[indexMembro].total_pontos_dev += pontos
          return true
        }

        estatisticas_membros[indexMembro].total_pontos_dev = pontos

      })

    } catch (error) {
      console.warn(error)
      return error
    }
  }

  const _criando_card = function (cards, lists, totalCustomFilds) {
    const cardsCustum = []

    try {
      cards.forEach((card) => {
        if (card.closed) {
          return false
        }

        let participantes = _participantes_cards(card.idMembers)

        let situacaoValue = lists.filter(list => {
          if (card.idList == list.id)
            return list.name
        })

        const field = {}

        card.customFieldItems.forEach((item) => {

          if (item.idValue) {
            const valorEncontrado = totalCustomFilds.filter(field => {
              return field.idCustumFiel == item.idCustomField && field.id == item.idValue
            })

            if (Number.isInteger(parseInt(valorEncontrado[0].descricao))) {
              field.complexidade = valorEncontrado[0].descricao
            } else if (!Number.isInteger(parseInt(valorEncontrado[0].descricao)) && valorEncontrado[0].descricao != void 0) {
              field.tamanho = valorEncontrado[0].descricao
            }
          }
        })

        let nameSituacao = situacaoValue[0].name.split(' ')[0]
        if (nameSituacao == 'Concluído') {
          nameSituacao = nameSituacao.replace('Concluído', 'Concluido')
        }

        pesoTotal += tamanhoValues[`${field.tamanho}`] * field.complexidade || 0

        let pontos = tamanhoValues[`${field.tamanho}`] * field.complexidade || 0
        switch (optionsSituacao[`${nameSituacao}`]) {
          case "Concluido":
            qtd_situcao_concluido += pontos
            break
          case "Andamento":
            qtd_situacao_andamento += pontos
            break
          case "Backlog":
            qtd_situacao_backlog += pontos
            break
        }

        _separa_participantes_estaticas(participantes)
        _contagem_de_card_por_membro(participantes, card.labels, pontos)
        _contagem_label_por_card(card.labels, pontos)


        let nameLabel
        card.labels.forEach(label => {
          const name = _filtrar_descricao_correta_para_labels(label.name)
          if (name) nameLabel = name
        })

        cardsCustum.push({
          titulo: card.name,
          descricao: card.desc,
          link: card.shortUrl,
          tamanho: field.tamanho || '',
          complexidade: field.complexidade || '',
          situacao: optionsSituacao[`${nameSituacao}`],
          peso: pontos,
          participantes,
          label: nameLabel || ''
        })

        qtd_cards += 1
      })

    } catch (error) {
      error
    }

    return cardsCustum
  }

  return services
})

export default HomeService