import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '../redux/hooks'

import NavBar from '../components/header/header.component'
import Footer from '../components/footer/footer.component'

import { removeError as removeUserError } from '../redux/user/user.slice'
import { getAllProducts, removeError as removeProductsError } from '../redux/products/products.slice'
import ScrollToTop from '../components/scroll-to-top/scroll-to-top.component'

import './App.scss'

const HomePage = lazy(() => import('../pages/home/home.page'))
const SectionPage = lazy(() => import('../pages/section/section.page'))
const ProductPage = lazy(() => import('../pages/product/product.page'))
const ProfilePage = lazy(() => import('../pages/profile/profile.page'))

export const sections = ['sneakers', 'shoes', 'boots', 'slippers']

const App = () => {
  const dispatch = useAppDispatch()
  const { error: userError } = useAppSelector(state => state.user)
  const { error: productsError } = useAppSelector(state => state.products)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  useEffect(() => {
    if(userError) {
      alert(userError.error)
      dispatch(removeUserError())
    }
    if(productsError) {
      alert(userError.error)
      dispatch(removeProductsError())
    }
  }, [userError, productsError, dispatch])

  return (
    <div className='app'>
      <ScrollToTop>
        <NavBar />
        <Suspense fallback={<span>Loading...</span>}>
        <Routes>
          <Route path='/' element={<HomePage />}  />
          {sections.map(section => <Route path={'products/'+section} element={<SectionPage />} />)}
          {sections.map(section => <Route path={'products/'+section+'/:id'} element={<ProductPage />} />)}
          <Route path='profile' element={<ProfilePage />}  />
          <Route path='*' element={<span>Page not found</span>}  />
        </Routes>
        </Suspense>
        <Footer />
      </ScrollToTop>
    </div> 
  )
}

export default App
