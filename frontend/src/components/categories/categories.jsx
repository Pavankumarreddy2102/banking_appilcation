import { useEffect } from 'react'
import './categories.css'
import { useNavigate } from 'react-router-dom'
import ProductService from '../../api-service/product.service'
import Loading from '../loading/loading'

function Categories() {

    const {
        getAllCategories,
        isLoading,
        categories = [],   // ✅ Prevents undefined.map error
        error
    } = ProductService()

    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onExplore = (id, name) => {
        navigate(`/products/${name}`, { state: { categoryId: id } })
    }

    return (
        <section className="banner-container">
            <h1>Browse wellness by categories</h1>

            {isLoading && <Loading />}

            {error && (
                <p className="error">Failed to load categories: {error}</p>
            )}

            {categories.map((category) => (
                <div className="banner" key={category.id}>
                    <img
                        src={`/categories/${category.imageUrl}`}
                        alt={category.categoryName}
                    />
                    <div className="b-content">
                        <h3>{category.categoryName}</h3>
                        <p>{category.description}</p>
                        <button onClick={() => onExplore(category.id, category.categoryName)}>
                            Explore Now
                        </button>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default Categories
