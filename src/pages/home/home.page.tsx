import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { images, products, ads, about } from '../../utils/home.utils'

import './home.styles.scss'

const HomePage = () => {
    const [index, setIndex] = useState(0)
    const timeoutRef = useRef<NodeJS.Timeout>()  
    const navigate = useNavigate()  

    const resetTimeout = () => timeoutRef.current ? clearTimeout(timeoutRef.current) : null

    useEffect(() => {
        resetTimeout()
        timeoutRef.current = setTimeout(
            () => 
                setIndex(prevIndex =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                ),
            6000
        )

        return () => {
            resetTimeout()
        }        
    }, [index])
    return (
        <div className='home-page'>
            <div 
                className='slide-container'
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
            {
                images.map((img, i) => (
                    <div 
                        key={ i }
                        className='slide'
                        style={{
                            'background': `url(${img}) no-repeat center center`
                        }}                            
                    >
                    </div>
                ))
            }
            </div>
            <div className="dots-container">
                {images.map((_, i) => (
                    <div
                        key={i}
                        className={`dot${index === i ? " active" : ""}`}
                        onClick={() => {
                            setIndex(i)
                        }}
                    >
                    </div>
                ))}
            </div> 
            <span className='title'>Explore our products</span>
            <div className='cols-wrapper'>
            {
                products.map(arr => (
                    <div className='col'>
                    { 
                        arr.map(el => (
                            <div 
                                className={`p ${el.big ? 'big' : null}`}
                                onClick={() => navigate('products/'+el.desc)}
                            >
                                <div className='filter'>
                                    <img src={el.img} alt='product' width='100%' height='100%' />
                                    <span>{el.desc}</span>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                ))
            }
            </div>
            <div className='icons'>
            {
                ads.map(el => (
                    <div className='el'>
                        <div className='icon'>
                            <img src={el.img} alt='ico' width='100%' height='100%' />                            
                        </div>                        
                        <span>{el.desc}</span>
                    </div>
                ))
            }
            </div>
            <div className='about-us'>
                <span className='title'>about us</span>
                {
                    about.desc.map(desc => (
                        <span className='desc'>{desc}</span>
                    ))
                }                
            </div>
        </div>
    )
}

export default HomePage