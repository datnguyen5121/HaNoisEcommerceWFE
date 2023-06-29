export interface ProductValues {
    _id?: string
    gender: string
    productName: string
    title: string
    description: string
    category: string[]
    size: string[]
    imgUrl: FileList | null
    price: number | null
}
