interface IProductTag {
    _id: string
    navName: { _id: string; navName: string }
    list: string[]
    subnavName: string
}
const useProductTag = (data: IProductTag[]) => {
        const navNamesMap: { [key: string]: any } = {}
        data.forEach((item) => {
            let navName = item.navName.navName
            let navNameId = item.navName._id
            let subnavNameId = item._id
            let subnavName = item.subnavName
            let list = item.list
            if (navNamesMap[navName]) {
                navNamesMap[navName].list.push({
                    navName,
                    navNameId,
                    subnavNameId,
                    subnavName,
                    list
                })
            } else {
                navNamesMap[navName] = {
                    navName,
                    list: [
                        {
                            navName,
                            navNameId,
                            subnavNameId,
                            subnavName,
                            list
                        }
                    ]
                }
            }
        })
        return Object.values(navNamesMap)
}
export default useProductTag