import Logo from '../../assets/Logo.svg'

function Header() {
    return (
        <header className='bg-slate-600'>
            <div className='container'>
                <div className='flex items-center'>
                    <img src={Logo} alt='nike' />
                    <div>search</div>
                    <div></div>
                </div>
            </div>
        </header>
    )
}

export default Header
