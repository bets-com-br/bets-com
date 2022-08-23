import { useRouter } from 'next/router'
import React from 'react'
import useSportCategories from 'src/hooks/useSportCategories/useSportCategories'
import type { ISportCategorySummary } from 'src/interface'

export interface IGlobalContextPropsProps {
  query?: any
  isLoadingGlobalContext?: boolean
  categories?: ISportCategorySummary[]
  category?: ISportCategorySummary
  pathname?: string
}

export const GlobalContext = React.createContext<IGlobalContextPropsProps>(
  {} as any
)

const GlobalContextProvider: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  const { query, pathname } = useRouter()

  const { data: categories, isValidating: loadingCategories } =
    useSportCategories(query?.sport as string)

  // Loading global context
  const isLoadingGlobalContext = React.useMemo(
    () => loadingCategories,
    [loadingCategories]
  )

  const category = React.useMemo(
    () => categories?.find((x) => x.slug === query?.category),
    [categories, query?.category]
  )

  return (
    <GlobalContext.Provider
      value={{
        query,
        categories,
        isLoadingGlobalContext,
        category,
        pathname,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
