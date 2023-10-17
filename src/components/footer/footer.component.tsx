import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router'

import './footer.styles.scss'

const elements = [
    'home',
    'sneakers',
    'shoes',
    'boots',
    'slippers'
]

const Footer = () => {
    const navigate = useNavigate()

    return (
        <footer>
            <div className='row'>
                <FontAwesomeIcon icon={faFacebook} className='icon' color='#ff5858' size='3x'/>
                <FontAwesomeIcon icon={faTwitter} className='icon' color='#ff5858' size='3x'/>
                <FontAwesomeIcon icon={faLinkedin} className='icon' color='#ff5858' size='3x'/>
                <FontAwesomeIcon icon={faInstagram} className='icon' color='#ff5858' size='3x'/>
            </div>
            <div className='row'>
            {
                elements.map(el => (
                    <span 
                        className='item'
                        onClick={() => navigate(el === 'home' ? '/' : el)}
                    >
                        {el}
                    </span>
                ))
            }
            </div>
            <div className='row'>
                <span className='copyright'>
                    ©2022-2023 | <a href='https://github.com/Saverio683' target='_blank' rel='noreferrer'>Saverio Randazzo</a>
                </span>
            </div>
        </footer>
    )
}

export default Footer