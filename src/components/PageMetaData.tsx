import { useEffect } from 'react'
import { SITE_NAME } from '@/config/site'

type PageMetaDataProps = {
  title: string
}

const PageMetaData = ({ title }: PageMetaDataProps) => {
  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`
    return () => {
      document.title = SITE_NAME
    }
  }, [title])

  return null
}

export default PageMetaData
