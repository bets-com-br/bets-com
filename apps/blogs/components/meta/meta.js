import Head from "next/head"
import { useRouter } from 'next/router'

export default function Meta(props) {
  const { settings, article, tag, articlesTags } = props;
  const router = useRouter();
  const hostname = 'https://bets.com.br';
  const canonicalUrl = hostname+router.asPath

  // get default settings
  const {
    og_title: set_title,
    og_description: set_description,
    og_title: set_og_title,
    keywords: set_keywords,
    og_description: set_og_description,
    og_image: set_og_image,
    twitter_title: set_twitter_title,
    twitter_description: set_twitter_desc,
    twitter_image: set_twitter_image,
    twitter: set_twitter_username,
    facebook: set_facebook_user,
    cover_image: set_image,
    icon: set_icon,
    accent_color,
    defaultSettings,
  } = settings

  // get article meta data if exist, undefined instead
  const {
    title: article_title,
    description: article_description,
    feature_image: article_image,
    og_title: article_og_title,
    og_description: article_og_description,
    og_image: articl_og_image,
    twitter_title: article_twitter_title,
    twitter_description: article_twitter_desc,
    twitter_image: article_twitter_image,
    meta_title,
    meta_description,
    published_at,
    updated_at,
    primary_author,
    slug,
  } = article || {};


  // get tag meta data if exist, undefined instead
  const {
    name: tag_title,
    description: tag_description,
    feature_image: tag_image,
    keywords: tag_keywords,
    og_title: tag_og_title,
    og_description: tag_og_description,
    og_image: tag_og_image,
    twitter_title: tag_twitter_title,
    twitter_description: tag_twitter_desc,
    twitter_image: tag_twitter_image,
    url: tag_url
  } = tag || {};

  

  const type = article ? "article" : tag ? "tag" : "website"
  const siteIcon = set_icon || defaultSettings.siteIcon
  const siteAccent = accent_color || defaultSettings.siteAccent
  const siteUrl = article?.slug
    ? getArticleUrl(slug, defaultSettings.siteUrl)
    : defaultSettings.siteUrl

  // site data
  const title = meta_title || article_title || tag_title || set_title
  const desc = meta_description || article_description || tag_description || set_description
  const image = article_image || set_image || tag_image || defaultSettings.siteImage
  const keywords = articlesTags || tag_keywords || set_keywords || "not??cias esportivas, futebol, mma, t??nis, h??quei, apostas esportivas, apostas, brasil, premier league, brasileiroo series a"
  // social account
  const twitter = primary_author?.twitter || set_twitter_username
  const facebook = primary_author?.facebook || set_facebook_user

  // open graph meta tags
  const ogTitle = article_og_title || tag_og_title || set_og_title || title
  const ogDesc = article_og_description || tag_og_description || set_og_description || desc
  const ogImage = articl_og_image || tag_og_image || set_og_image || image

  // twitter meta tags
  const twitterTitle = article_twitter_title || tag_twitter_title || set_twitter_title || title
  const twitterDesc = article_twitter_desc || tag_twitter_desc || set_twitter_desc || desc
  const twitterImage = article_twitter_image || tag_twitter_image || set_twitter_image || image
  const cannonical = slug || tag_url || canonicalUrl

  return (
    
    <Head>
      <meta charSet="utf-8" />
      <link rel="icon" href={siteIcon}/>
      <link rel="apple-touch-icon" sizes="180x180" href={siteIcon} />
      <link rel="icon" type="image/png" sizes="32x32" href={siteIcon} />
      <link rel="icon" type="image/png" sizes="16x16" href={siteIcon} />
      <link rel="shortcut icon" href={siteIcon} />
      <meta name="theme-color" content={siteAccent} />

      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={cannonical} />
      <meta name="author" content={"Bets.com.br"} />
      <meta name="keywords" content={keywords} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content={ogTitle} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDesc} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDesc} />
      <meta name="twitter:image" content={twitterImage} />
      {twitter && <meta property="twitter:creator" content={twitter} />}
      {twitter && <meta property="twitter:site" content={getTWTLink(twitter)} />}

      {published_at && <meta property="article:published_time" content={published_at} />}
      {updated_at && <meta property="article:modified_time" content={updated_at} />}
      {facebook && <meta property="article:author" content={getFBLink(facebook)} />}
      
    </Head>
  )
}

const getFBLink = (uname) => {
  return `https://www.facebook.com/Bets.com.br/`
}

const getTWTLink = (uname) => {
  return `https://twitter.com/betscombr`
}

const getArticleUrl = (slug, siteUrl) => {
  return `${siteUrl}/${slug}`
}
