import React from 'react'
import Navbar from './Navbar/Navbar'

const AppPage = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

export default AppPage