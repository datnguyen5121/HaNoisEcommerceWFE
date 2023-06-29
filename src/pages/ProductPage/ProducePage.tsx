const ProducePage = () => {
    return (
        <>
            <div>Header Product</div>
            <div>
                <h2>Product Page</h2>
            </div>
            <div>
                <input type='text' placeholder='Search Producdt' />
            </div>
            <div>
                <button>Create a new Product</button>
            </div>
            <div>
                <table>
                    <thead className={`bg-green-400`}>
                        <tr>
                            <th>STT</th>
                            <th>productName</th>
                            <th>description</th>
                            <th>category</th>
                            <th>size</th>
                            <th>imgUrl</th>
                            <th>price</th>
                            <th>feature</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </>
    )
}

export default ProducePage
