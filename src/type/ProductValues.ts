export interface ProductValues {
    _id: string
    title: string
    description: string
    datePublish: string
    category: string[]
    size: string[]
    imgUrl: {}
    // imgUrl: {
    //     [key: string]: {
    //         lastModified: number
    //         lastModifiedDate: Date
    //         name: string
    //         size: number
    //         type: string
    //         webkitRelativePath: string
    //     }
    // }
    // price: number
}
