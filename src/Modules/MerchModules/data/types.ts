

export type GeneralMerchData = {
  formLink: string,
  sizeGuideImage: string,
}


export type MerchEntry = {
  id: string,
  name: string,
  description: string,
  price: string,
  images: string[], // url
  thumbImage: string, // url
  sizes: string[],
  connectedMerchIds?: string[]
}
