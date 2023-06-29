import Tippy from '@tippyjs/react/headless'
import ProductItem from '../ProductItem'
import style from './Search.module.css'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useDebounce } from '../../customhooks/useDebounce'
import { ProductValues } from '../../type/ProductValues'
import { IProductData } from '../ProductDetail/ProductDetail'
function Search() {
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchResult, setSearchResult] = useState<IProductData[]>([])
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const debounceValue = useDebounce(searchValue, 300)

    const handleHideResult = () => {
        setShowResult(false)
    }

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }
    useEffect(() => {
        if (!debounceValue.trim()) {
            return
        }
        setLoading(true)
        fetch(`https://hanoisecommercewbe.onrender.com/api/get-search-value?q=${encodeURIComponent(debounceValue)}`)
            // fetch(`http://localhost:8080/api/get-search-value?q=${encodeURIComponent(debounceValue)}`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [debounceValue])
    return (
        <div>
            <Tippy
                onClickOutside={handleHideResult}
                interactive={true}
                visible={showResult && searchResult.length > 0}
                placement='bottom'
                render={(attrs) => (
                    <div
                        className={`${style.customHeightSearchResult} flex flex-col gap-4 bg-white px-3 py-2 border rounded-lg mt-1 min-h-[100px]  shadow-md w-[400px] overflow-y-auto`}
                        tabIndex={-1}
                        {...attrs}
                    >
                        {searchResult.map((item) => (
                            <ProductItem isSearch={true} key={item._id} data={item} />
                        ))}
                    </div>
                )}
            >
                <div className='bg-gray-100 h-[40px]  sm:w-[400px] rounded-full flex items-center border border-transparent focus-within:border-gray-300'>
                    <input
                        ref={inputRef}
                        type='text'
                        className='bg-transparent outline-none px-4 w-full flex-1 py-2'
                        spellCheck={false}
                        placeholder='Search'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button onClick={handleClear}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon icon={faSpinner} spin className={`${style.rotating} w-3 h-3`} />}

                    <button className='px-3  h-full rounded-br-full rounded-tr-full'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </Tippy>
        </div>
    )
}

export default Search
