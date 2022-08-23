import useTeamContext from 'src/hooks/useTeamContext/useTeamContext'
import Card from 'src/components/Card/Card'
import TeamMainContentSkeleton from './TeamMainContentSkeleton'

const TeamMainContent: React.FC = () => {
  const { isLoadingTeamContext, profile, createCustomTeamHref } =
    useTeamContext()

  if (isLoadingTeamContext) {
    return <TeamMainContentSkeleton />
  }

  if (!profile) {
    return <></>
  }

  return (
    <Card>
      <Card.Content className="border-b">
        <Card.Header
          title={profile?.competitor?.name!}
          titleHref={createCustomTeamHref(profile?.competitor)}
          icon={profile?.competitor?.icon}
          descriptionIcon={profile?.category?.country_info?.icon}
          descriptionText={profile?.category?.country_info?.name}
        >
          {/* <FollowButton /> */}
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>{profile?.summary_text}</Card.Description>
      </Card.Content>
    </Card>
  )
}

export default TeamMainContent
