interface IProps {
    text: string
    type: string
    filterArray: string[]
}

function FilterItem(props: IProps) {
    const { text, filterArray, type } = props
    return (
        <div className='text-lg'>
            <div className='capitalize'>{text}</div>
            <div>
                {filterArray.map((item) => {
                    return (
                        <div>
                            <label htmlFor={item}>
                                <input type={type} value={item} id={item} className='w-4 h-4 checked:bg-black' />{' '}
                                <span className='capitalize'>{item}</span>
                            </label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FilterItem
