import { memo, useState } from 'react'
import FilterItem from '../FilterItem'
interface IProps {
    filter: string[]
    setFilter: (value: string[]) => void
}
function FilterContainer(props: IProps) {
    const { filter, setFilter } = props
    const handleFilterChange = (value: string, isChecked: boolean) => {
        if (isChecked) {
            setFilter([...filter, value])
        } else {
            setFilter(filter.filter((s) => s !== value))
        }
    }
    console.log(filter)

    return (
        <>
            <FilterItem
                state={filter}
                onChange={handleFilterChange}
                text={'gender'}
                type={'checkbox'}
                filterArray={['Men', 'Women']}
            />

            <FilterItem
                state={filter}
                onChange={handleFilterChange}
                text={'size'}
                type={'checkbox'}
                filterArray={['36', '37', '38', '39', '40']}
            />
        </>
    )
}

export default memo(FilterContainer)
