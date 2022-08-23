import React from 'react'
import { ISportEventStatus, ISportEventSummary } from 'src/interface'
import Card from 'src/components/Card/Card'
import usePaginatedData from 'src/hooks/usePaginatedData/usePaginatedData'
import type { IMatchTable } from './MatchTable'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import cx from 'classnames'
import { MatchTableTeam } from './MatchTableTeam'
import Link from '@app/link'

export interface IMatchTableContentProps extends IMatchTable {
  summaries: ISportEventSummary[]
}

export const MatchTableContent: React.FC<IMatchTableContentProps> = ({
  summaries,
  ...restProps
}) => {
  // const { push, createGamePageHref, query } = useGlobalContext()

  const { paginatedData, completed, nextPage } = usePaginatedData(summaries)

  const { createGameHref, push } = useCreateHref()

  const getScoreText = React.useCallback((status: ISportEventStatus) => {
    if (status?.match_status !== 'ended') {
      return <>vs</>
    }

    return (
      <>
        {status?.home_score}-{status?.away_score}
      </>
    )
  }, [])

  return (
    <Card {...restProps} viewMore={!completed} onClickViewMore={nextPage}>
      <div className="grid gap-4  p-4 px-2 lg:p-0 lg:gap-0">
        {paginatedData?.map((event) => (
          <Link
            key={event?.sport_event?.sport_event_id}
            href={createGameHref(event?.sport_event)}
          >
            <a
              className={cx(
                'border-2 rounded-md p-4 py-[0.6rem] lg:border-0 lg:border-b lg:rounded-none',
                'grid grid-cols-12 gap-2 items-center',
                'cursor-pointer hover:bg-blue-50 hover:text-primary-500'
              )}
            >
              <div
                className={cx(
                  'text-sm opacity-60',
                  'col-span-6 row-start-1 col-start-1',
                  'lg:col-span-2'
                )}
              >
                {event?.sport_event?.start_date_formatted}
              </div>

              <div
                className={cx(
                  'text-sm',
                  'col-span-12 lg:col-span-8 lg:row-start-1',
                  'grid grid-cols-12 items-center gap-2'
                )}
              >
                <MatchTableTeam team={event?.sport_event?.competitors[0]} />

                <div className="col-span-2 text-center">
                  <span>{getScoreText(event?.sport_event_status)}</span>
                </div>

                <MatchTableTeam team={event?.sport_event?.competitors[1]} />
              </div>

              <div
                className={cx(
                  'text-sm text-right opacity-60',
                  'col-span-6 col-start-7 row-start-1',
                  'lg:col-span-2'
                )}
              >
                {event?.sport_event?.sport_event_context?.season?.name}
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Card>
  )
}
