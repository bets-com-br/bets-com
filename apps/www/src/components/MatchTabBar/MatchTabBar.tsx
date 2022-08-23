import Link from '@app/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import MatchTabBarItem from './MatchTabBarItem'
import MatchTabBarSkeleton from './MatchTabBarSkeleton'
import cx from 'classnames'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import MatchTabBarEmpty from './MatchTabBarEmpty'
import { withMatchTabBarWrapper } from './withMatchTabBarWrapper'
import useMatchListContext from 'src/hooks/useMatchListContext/useMatchListContext'
import { Navigation } from 'swiper'

const MatchTabBar: React.FC = () => {
  const { query, games, isLoadingMatchListContext } = useMatchListContext()

  const { createGameHref } = useCreateHref()

  if (isLoadingMatchListContext) {
    return <MatchTabBarSkeleton />
  }

  if (!games || games?.length === 0) {
    return <MatchTabBarEmpty />
  }

  return (
    <div>
      <Swiper
        className="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-4"
        slidesPerView="auto"
        modules={[Navigation]}
        navigation={true}
        freeMode={true}
      >
        {games?.map((summary) => (
          <SwiperSlide
            key={summary?.sport_event?.sport_event_id}
            className={cx('border-r border-slate-300 h-full', {
              'border-b-4 border-b-primary-500 bg-slate-300':
                summary?.sport_event?.sport_event_id === query?.game_id,
            })}
          >
            <Link href={createGameHref(summary?.sport_event)}>
              <MatchTabBarItem summary={summary} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default withMatchTabBarWrapper(MatchTabBar)
