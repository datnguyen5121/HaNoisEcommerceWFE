import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

interface IProps {
    onChange: (size: string, isChecked: boolean) => void
    text: string
    type: string
    filterArray: string[]
    state: string[]
}

function FilterItem(props: IProps) {
    const { text, filterArray, type, onChange, state } = props
    const [show, setShow] = useState(false)
    const [iconRotation, setIconRotation] = useState(false)
    const handleShow = () => {
        setShow(!show)
        setIconRotation(!iconRotation)
    }
    return (
        <div className='text-lg border-t relative mr-2'>
            <div className='flex items-center justify-between'>
                <button onClick={handleShow} className='w-full py-3  capitalize text-start mb-2 '>
                    {text}
                </button>
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className='transition'
                    rotation={iconRotation ? 180 : undefined}
                />
            </div>
            {show && (
                <div className='pb-3'>
                    {filterArray.map((item) => {
                        return (
                            <div key={item}>
                                <label htmlFor={item}>
                                    <input
                                        type={type}
                                        value={item}
                                        id={item}
                                        checked={state.includes(item)}
                                        onChange={(e) => onChange(item, e.target.checked)}
                                        className='w-4 h-4 checked:bg-black'
                                    />{' '}
                                    <span className='capitalize'>{item}</span>
                                </label>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default FilterItem
