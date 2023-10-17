import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders } from '@fortawesome/free-solid-svg-icons'

import Product from '../../components/product/product.component'
import { setSelectedProduct } from '../../redux/products/products.slice'

import './section.styles.scss'
import { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'

const SectionPage = () => {
    const dispatch = useAppDispatch()
    const { loading, products } = useAppSelector(state => state.products)
    const location = useLocation()
    const pathSegments = location.pathname.split('/')
    const section = pathSegments[pathSegments.length - 1]

    return (
        <div className='section-page'>
        {
            loading ? (
                <span>loading...</span>
            ) : (
                <Fragment>
                    <span className='title'>{section}</span>
                    <span className='desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </span>
                    <div className='filters-ct'>
                        <div className='filter'>
                            <FontAwesomeIcon icon={faSliders} className='icon' color='#fff' />
                            <span>filters</span>
                        </div>
                        <div className='right'>
                            <span className='results'>24 results</span>
                            <select>
                                <option value='' disabled selected hidden>sort by</option>
                                <option value='lower'>lower price</option>
                                <option value='higher'>higher price</option>
                            </select>
                        </div>
                    </div>
                    <div className='products'>
                    {
                        products.map((p, i) => p.category.toLowerCase() === section ? (
                            <div
                                className='product-wrapper'
                                onClick={() => dispatch(setSelectedProduct(p))}
                            >
                                <Product
                                    _id={p._id}
                                    discount={p.discount} 
                                    images={p.images} 
                                    key={p.name} 
                                    name={p.name} 
                                    price={p.price} 
                                    sizes={p.sizes}  
                                    category={p.category}
                                    color={p.color}
                                    quantity={p.quantity}
                                    created_at={p.created_at}
                                />
                            </div>
                        ) : null)
                    }
                    </div>
                </Fragment>
            )
        }
        </div>
    )
}

export default SectionPage