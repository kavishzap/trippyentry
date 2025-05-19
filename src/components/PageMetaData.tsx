type PageMetaDataProps = {
  title: string
}

const PageMetaData = ({ title }: PageMetaDataProps) => {
  return (
      <title> {title} | Event Booking System </title>
  )
}

export default PageMetaData
