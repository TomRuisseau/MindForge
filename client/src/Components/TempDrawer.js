import React from 'react'

// import component
import Drawer from 'react-modern-drawer'

//import styles
import 'react-modern-drawer/dist/index.css'

const TempDrawer = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <>
            <button onClick={toggleDrawer}>Omg le tiroir</button>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                className='drawer'
                size={500}
            >
                <button onClick={toggleDrawer}>Omg le tiroir ?</button>
                <h1>Liste d'actions</h1>
            </Drawer>
        </>
    )
}

export default TempDrawer