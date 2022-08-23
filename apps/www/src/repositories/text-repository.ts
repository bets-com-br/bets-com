import { ILeagueSummary, ISeasonSummary, ITeamProfile } from 'src/interface'
import { templateString } from 'src/utils/string'

export class TextRepository {
  leagueCurrentSeasonSummaryText(summary: ILeagueSummary) {
    const leagueName = summary?.league?.name
    const seasonName = summary?.current_season?.name
    const sportName = summary?.sport
    const categoryName = summary?.league?.country_info?.name
    const gender = summary?.league?.gender
    const teamCount = summary?.current_season_teams?.length
    const dateStart = summary?.current_season?.start_date
    const dateEnd = summary?.current_season?.end_date

    return `${leagueName}, também conhecida como, ${seasonName}, é a liga de ${sportName} profissional no(a) ${categoryName} para ${gender}. Existem ao todo ${teamCount} times que competem pelo título todos os anos entre ${dateStart} to ${dateEnd}`
  }

  /**
   * Generate team profile summary
   * @param normalizedProfile
   * @returns
   */
  teamProfileSummaryText(normalizedProfile: ITeamProfile): string | undefined {
    // const gender = normalizedProfile?.competitor?.gender

    const templateText = `{teamName}, é um time profissional de {sportName} do {categoryName}. O treiandor atual do {teamName} é {managerName}, ele é nascido no {managerCountryName}. A casa do {teamName} é o {venueName} e sua capacidade é de {venueCapacity}, o estádio fica localizado em {venueLocation}. O time joga atualmente com {jerseyCount} uniformes oficiais Você pode encontrar mais informações sobre este time aqui em baixo, é só rolar e ficar por dentro de tudo!`

    return templateString(templateText, {
      teamName: normalizedProfile?.competitor?.name,
      sportName: normalizedProfile?.sport?.name,
      categoryName: normalizedProfile?.category?.name,
      managerName: normalizedProfile?.manager?.name,
      managerCountryName: normalizedProfile?.manager?.country_info?.name,
      venueName: normalizedProfile?.venue?.name,
      venueCapacity: normalizedProfile?.venue?.capacity,
      venueLocation: `${normalizedProfile?.venue?.city_name}, ${normalizedProfile?.venue?.country_name}`,
      jerseyCount: normalizedProfile?.jerseys?.length,
    })
  }

  /**
   * Generate season summary text
   * @param summary
   * @returns
   */
  seasonSummaryText(summary: ISeasonSummary) {
    //  const startDate = summary?.sport_event_context?.season?.start_date_formatted
    //  const endDate = summary?.sport_event_context?.season?.end_date_formatted

    const text = `{competitionName}, é uma competição profissional de {sportName} disputada no {categoryName} na categória {gender}. No geral, {teamCount} equipes disputam o título todos os anos e a competição acontece entre {seasonName}. Para acompanhar a pontuação dos times que estão disputando o caneco e os próximos jogos da competição, visite nossa página dedicada a {competitionName} e fique por dentro de tudo que está acontecendo na liga.`

    return templateString(text, {
      competitionName: summary?.sport_event_context?.competition?.name,
      seasonName: summary?.sport_event_context?.season?.name,
      sportName: summary?.sport_event_context?.sport?.name,
      categoryName: summary?.sport_event_context?.category?.country_info?.name,
      gender: summary?.sport_event_context?.competition?.gender,
      teamCount: summary?.teams?.length,
    })
  }
}
