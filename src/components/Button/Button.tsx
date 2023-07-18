const Button = ({ text, textClass, onClick }) => {
    return (
        <>
            <button onClick={onClick} className={` ${textClass}  rounded-full hover:opacity-70`}>
                {text}
            </button>
        </>
    )
}
export default Button
