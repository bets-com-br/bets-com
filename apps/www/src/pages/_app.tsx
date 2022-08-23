// Import Swiper styles
// import 'swiper/css'
import 'swiper/css/bundle'

import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'

import 'src/styles/sr-lmt-theme.css'

import 'src/styles/global.css'

import type { AppProps } from 'next/app'
import React from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'
import GlobalContextProvider from 'src/context/GlobalContext/GlobalContext'
import { DefaultSeo, NextSeo } from 'next-seo'
import seo from '../../next-seo.config.js'
import { SWRConfig } from 'swr'
import { fetcher } from 'src/utils/fetcher'
import { I18nProvider } from '@corex/use-i18n'
import commonLocales from 'src/i18n/common.json'
import { MatchListContextProvider } from 'src/context/MatchListContext/MatchListContext'
import dynamic from 'next/dynamic'
import LMTScript from 'src/components/LMTScript/LMTScript'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const GTag = dynamic(() => import('src/components/GTag/GTag'), { ssr: false })

const IS_PROD = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'

const App: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const Layout = (Component as any)?.Layout

  return (
    <>
      <LMTScript />

      <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
        <DefaultSeo
          {...seo}
          dangerouslySetAllPagesToNoIndex={!IS_PROD}
          dangerouslySetAllPagesToNoFollow={!IS_PROD}
        />

        <NextSeo {...(pageProps?.seo ?? {})} />

        <I18nProvider locale="pt" dict={commonLocales}>
          <GlobalContextProvider {...pageProps}>
            <MatchListContextProvider>
              {Layout ? (
                <Layout {...pageProps}>
                  <Component {...pageProps} />
                </Layout>
              ) : (
                <>
                  <Component {...pageProps} />
                </>
              )}
            </MatchListContextProvider>
          </GlobalContextProvider>
        </I18nProvider>
      </SWRConfig>

      <GTag />
    </>
  )
}

export default App
