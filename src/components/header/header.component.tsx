import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'

import './header.styles.scss'

import { useAppSelector } from '../../redux/hooks'
import { sections } from '../../app/App'
import { useState } from 'react'

const NavBar = () => {
    const navigate = useNavigate()
    const { cart } = useAppSelector(state => state.user)
    const [isCartSelected, setIsCartSelected] = useState(false)

    return (
        <header>   
                <div className='wrap1'>
                    <span 
                        className='title'
                        onClick={() => navigate('/')}
                    >
                        SUPERSHOP
                    </span>
                    {
                        sections.map(el => (
                            <span 
                                className='item'
                                onClick={() => navigate('products/'+el)}
                            >
                                {el}
                            </span>
                        ))
                    }
                </div>
                <div className='wrap2'>
                    <input type='text' placeholder='Search for a product' />
                    <div 
                        className='cart-wrapper'
                        onClick={() => setIsCartSelected(prevState => !prevState)}
                    >
                        <FontAwesomeIcon className='icon' icon={faCartShopping} size='2x'/>
                        <span className={`amount ${isCartSelected ? 'hidden' : ''}`}>
                            {cart.length}
                        </span>
                        <div
                            className={`cart-items-ct ${isCartSelected ? '' : 'hidden'}`}
                        >
                        {
                            cart.length ?
                                cart.map(item => (
                                    <div className='item'>
                                        <img src={item.images[0]} alt='img' width='50px' height='50px' />
                                        <div className='wrapper'>
                                            <span className='item-name'>{item.name}</span>
                                            <span className='item-price'>€ {item.price}</span>
                                        </div>
                                    </div>
                                ))
                            :
                                null
                        }
                        <button>checkout</button>
                        </div>
                    </div>
                    <FontAwesomeIcon className='icon' icon={faUser} size='2x' onClick={() => navigate('profile')}/>                    
                </div>  
        </header>
    )
}

export default NavBar