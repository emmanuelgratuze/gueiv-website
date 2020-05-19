import React, { useContext } from 'react'
import { Transformation } from 'cloudinary-core'

import Image, { ImageProps } from 'components/Image'

import CloudinaryContext from './CloudinaryContext'


export type CloudinaryImageProps = ImageProps & {
  fileName: string;
  cloudinaryOptions?: Transformation.Options;
}

const CloudinaryImage: React.FC<CloudinaryImageProps & ImageProps> = ({
  cloudinaryOptions,
  fileName,
  ...props
}) => {
  const { cloudinary } = useContext(CloudinaryContext)

  let derivedFileName = fileName
  if (fileName.includes(`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/`)) {
    // https://res.cloudinary.com/dq9k7gnud/image/upload/<filename>
    [, derivedFileName] = fileName.split(`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/`)
  } else {
    // assets/<filename>
    [, derivedFileName] = fileName.split('/')
  }

  const url = cloudinary?.url(derivedFileName, cloudinaryOptions || {})

  return (
    <Image
      src={url}
      {...props}
    />
  )
}

export default CloudinaryImage
