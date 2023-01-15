import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from '../contexts/AppContext'
import CustomerList from '../pages/CustomerList'
import CustomerRegistration from '../pages/CustomerRegistration'
import LoginPage from '../pages/LoginPage'
import RandomDogPage from '../pages/RandomDogPage'
import StatusCodePage from '../pages/StatusCodePage'
import UsersPage from '../pages/UsersPage'

const Router = () => {
    return (
        <BrowserRouter>
            <AppContextProvider>
                <Routes>
                    <Route index element={<LoginPage />} />
                    <Route path='/list' element={<UsersPage />} />
                    <Route path='/statusCode' element={<StatusCodePage />} />
                    <Route path='/randomDog' element={<RandomDogPage />} />
                    <Route path='/register' element={<CustomerRegistration />} />
                    <Route path='/customerList' element={<CustomerList />} />
                </Routes>
            </AppContextProvider>
        </BrowserRouter>
    )
}

export default Router