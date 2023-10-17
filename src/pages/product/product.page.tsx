import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import './product.styles.scss'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { useNavigate } from 'react-router'
import { calculateDiscount } from '../../components/product/product.component'
import { addItemToCart } from '../../redux/user/user.slice'

const allSizes = [
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46
]

const ProductPage = () => {
    const { selectedProduct } = useAppSelector(state => state.products)
    const [imageIndex, setImageIndex] = useState<number>(0)
    const [isClicked, setIsClicked] = useState<Boolean>(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [selectedSize, setSelectedSize] = useState<Number | null>(null)

    const { name, images, price, sizes, discount, reviews, _id } = selectedProduct || {}


    const handleClick = () => {
        if(selectedSize && selectedProduct) {
            dispatch(addItemToCart(selectedProduct))
        } else 
            alert('Select a size first')
    }

    useEffect(() => {
        if(!selectedProduct)
            navigate('/', { replace: true })
    }, [selectedProduct, navigate])

    return (
        <div className='product-page'>
            <div className='container'>
                <div className='images-ct'>
                    <img 
                        alt={selectedProduct?.name}
                        src={selectedProduct?.images[imageIndex]}
                        width='100%'
                        height='600px'
                        className='main-image' 
                    />
                    <div className='others'>
                    {
                        images?.map((el, i) => (
                            <img 
                                className={`preview ${imageIndex === i ? 'selected' : null}`}
                                src={el}
                                alt='preview'
                                width='90px'
                                height='90px'
                                onClick={() => setImageIndex(i)}
                            />
                        )) 
                    }
                    </div>
                </div>
                <div className='summary'>
                    <div className='ct'>
                        <div className='title-wrapper'>
                            <span className='title'>{name}</span>
                            <FontAwesomeIcon 
                                icon={faHeart} 
                                size='2x' 
                                className='heart' 
                                color={isClicked ? '#ba3838' : '#ba38383a'}
                                onClick={() => setIsClicked(prevState => !prevState)}
                            />
                        </div>
                        <span className='price'>€{price ? calculateDiscount(price, discount) : null}</span> 
                        <div className={`discount-row ${selectedProduct?.discount ? '' : 'hidden'}`}>
                            <span className='full-price'>€{selectedProduct?.price}</span>
                            <span className='discount'>-{selectedProduct?.discount}%</span>
                        </div>
                    </div>  
                    <div className='sizes-ct'>
                        <span className='title'>size</span>
                        <div className='sizes'>
                        {
                            allSizes.map(s => (
                                <span 
                                    className={
                                        `size ${sizes?.includes(s) ? selectedSize === s ? 'selected' : '' : 'unavaiable' }`
                                }
                                    onClick={() => setSelectedSize(s)}
                                >
                                    {s}
                                </span>
                            ))
                        }
                        </div>
                    </div>   
                    <button
                        onClick={handleClick}
                    >
                        add to cart
                    </button>
                </div>
            </div>
            <div className='reviews'>
                <span className='title'>reviews</span>
                {
                    reviews?.length ? 
                        reviews.map(r => (
                            <div className='review'>
                                <h1>{r.user}</h1>
                            </div>
                        ))
                    :
                        <span className='no-reviews'>no reviews</span>
                }
            </div>
        </div>
    )
}

export default ProductPage