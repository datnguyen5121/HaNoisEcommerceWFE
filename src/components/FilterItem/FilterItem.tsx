import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
interface IProps {
    text: string | React.ReactNode
    children: React.ReactNode
}

function FilterItem(props: IProps) {
    const { text, children } = props
    const [show, setShow] = useState(false)
    const [iconRotation, setIconRotation] = useState(false)
    const handleShow = () => {
        setShow(!show)
        setIconRotation(!iconRotation)
    }
    return (
        <div className='text-lg relative mr-2'>
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
            {show && <div className='pb-3'>{children}</div>}
        </div>
    )
}

export default FilterItem
