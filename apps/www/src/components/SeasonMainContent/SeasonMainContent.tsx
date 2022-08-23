import Card from 'src/components/Card/Card'
import useSeasonContext from 'src/hooks/useSeasonContext/useSeasonContext'
import Progress from 'src/components/Progress/Progress'
import { SeasonMainContentSkeleton } from './SeasonMainContentSkeleton'
import SeasonClassification from 'src/components/SeasonClassification/SeasonClassification'
import SeasonSwitcher from './SeasonSwitcher'

const SeasonMainContent: React.FC = () => {
  const {
    summary,
    season,
    category,
    competition,
    seasonHref,
    isLoadingSeasonContext,
  } = useSeasonContext()

  if (isLoadingSeasonContext) {
    return <SeasonMainContentSkeleton />
  }

  return (
    <Card>
      <Card.Content className="border-b">
        <Card.Header
          titleHref={seasonHref}
          icon={competition?.icon!}
          title={season?.name!}
          descriptionIcon={category?.country_info?.icon}
          descriptionText={category?.country_info?.name ?? category?.name}
          description={
            <SeasonSwitcher allSeasons={summary?.all_seasons ?? []}>
              {season?.year}
            </SeasonSwitcher>
          }
        >
          {/* <FollowButton /> */}
        </Card.Header>

        <Progress
          progress={season?.season_progress!}
          descriptionLeft={season?.start_date_formatted}
          descriptionRight={season?.end_date_formatted}
        />
      </Card.Content>

      <Card.Content>
        <Card.Description>{summary?.season_summary_text}</Card.Description>
      </Card.Content>

      <SeasonClassification />
    </Card>
  )
}

export default SeasonMainContent
