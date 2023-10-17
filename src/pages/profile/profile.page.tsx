import { Fragment, useRef, useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { userAuth, UserData } from '../../redux/user/user.slice'

import './profile.styles.scss'

const checkPasswordStrength = (password: string): string[] => {
    const errors: string[] = []
    const minLength = 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasSpecialChar = /[!@#$%^&*()_+{}\\[\]:;<>,.?~\\/-]/.test(password)
    const hasDigits = /\d/.test(password)

    if (password.length < minLength)
        errors.push('Password must be at least 8 characters long.')
    if (!hasUppercase)
    errors.push('Password must contain at least one uppercase letter.')
        if (!hasSpecialChar)
    errors.push('Password must contain at least one special character.')
        if (!hasDigits)
    errors.push('Password must contain at least one digit.')

    return errors
} 

const Profile = () => {
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const dateRef = useRef<HTMLInputElement | null>(null)
    const [isLogin, setIsLogin] = useState(false)
    const [passwordErrors, setPasswordErrors] = useState<string[]>([])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setPasswordErrors([])

        let formData: { [key: string]: string } = {}
        const formElements = e.currentTarget.elements
        const length = formElements.length - 1 // -1 per via del tag button

        for(let i = 0; i < length; i++) {
            const input = formElements[i] as HTMLInputElement
            const name = input.name
            formData[name] = input.value
        }
        let route: 'register' | 'login'

        if(isLogin) {
            route = 'login'
        } else {
            route = 'register'
            if(formData.password !== formData.confirmPassword)
                return setPasswordErrors(['Passwords do not match.'])
            delete formData.confirmPassword
            const passwordStrength = checkPasswordStrength(formData.password)
            if(passwordStrength.length)
                return setPasswordErrors(passwordStrength)
        }
        setPasswordErrors([])
        dispatch(userAuth({ user: formData as unknown as UserData, route: route }))
    }

    return (
        <div className='profile-page'>
        {
            user.loading ? (
                <div className='loading-container'>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                </div>
            ) : user.id ? (
                <></>
            ) : (
                <div className='auth-form'>
                    <span className='title'>{isLogin ? 'login' : 'register'}</span>
                    <form onSubmit={handleSubmit}>
                    {
                        isLogin ? (
                            <Fragment>
                                <input required name='email' type='email' placeholder='email' />
                                <input required name='password' type='password' placeholder='password'/>
                            </Fragment>
                        ) : 
                        (
                            <Fragment>
                                <input required name='name' type='text' placeholder='name' />
                                <input required name='lastName' type='text' placeholder='last name' />
                                <input required name='email' type='email' placeholder='email' />
                                <input 
                                    required
                                    name='birthDate' 
                                    className='birth-date' 
                                    ref={dateRef} 
                                    type='text' 
                                    placeholder='birth date' 
                                    onMouseEnter={() => dateRef.current ? dateRef.current.type = 'date' : null} 
                                    onFocus={() => dateRef.current ? dateRef.current.type = 'date' : null}
                                />
                                <input required name='password' type='password' placeholder='password'/>
                                <input required name='confirmPassword' type='password' placeholder='confirm password'/>
                            </Fragment>
                        )
                    }
                        <button type='submit'>submit</button>
                    </form>
                    <div className='password-errors'>
                    {
                        passwordErrors.map(err => (
                            <div className='error'>{err}</div>
                        ))
                    }
                    </div>
                    <span>
                        {isLogin ? "Don't have an account?" : 'Already have an account?' }
                        <b onClick={() => setIsLogin(prevState => !prevState)}>
                            {isLogin ? 'Register' : 'Log in'}
                        </b>
                    </span>
                </div>
            )
        }
        </div>
    )
}

export default Profile