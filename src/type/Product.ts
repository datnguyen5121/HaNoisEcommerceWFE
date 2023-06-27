export interface Product {
    _id: string
    title: string
    description: string
    gender: string
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
