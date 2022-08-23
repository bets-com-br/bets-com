import NextImage, { ImageProps } from 'next/future/image'

export type IImageProps = ImageProps

const Image: React.FC<IImageProps> = (props) => {
  return <NextImage className="object-contain overflow-hidden" {...props} />
}

export default Image
