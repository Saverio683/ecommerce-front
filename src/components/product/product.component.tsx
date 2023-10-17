import { useNavigate, useLocation } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { Product as ProductType } from '../../redux/products/products.slice'

import './product.styles.scss'

export const calculateDiscount = (fullPrice: number, percentage: number | undefined): number => {
    return percentage ?
        Math.trunc(fullPrice -(fullPrice*percentage)/100)            
    :
        fullPrice
}

const Product = ({ discount, images, price, name, sizes, _id }: ProductType) => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    return (
        <div className='product'>
            <div className='onclick'
                onClick={() => navigate(pathname+'/'+name)}
            >
                <img 
                    alt='product-img'
                    src={images[0]}
                    className='bg-img' 
                    width='100%'
                    height='auto'
                />
                <div 
                    className='discount'
                    style={{ visibility: discount ? 'visible' : 'hidden' }}
                >
                    <span>-{discount}%</span>
                </div>
                <div className='sizes'>
                    {
                        sizes.map((size, i) => (
                            <span className='size' key={`size-${name}-${i}`}>
                                {size}
                            </span>
                        ))
                    }
                    </div>
                <div className='product-details'>
                    <span className='product-name'>{name}</span>
                    <div className='price-row'>
                        <span 
                            className={`full-price ${!discount ? 'hidden' : null}`}                    
                        >
                            €{price}
                        </span>
                        <span className='discount-price'>€{calculateDiscount(price, discount)}</span>
                    </div>
                </div>
            </div>
            <FontAwesomeIcon 
                icon={faHeart} 
                size='2x' 
                className='heart' 
                color={true ? '#fe1a1a' : '#ba38383a'}
            />
        </div>        
    )
}

export default Product