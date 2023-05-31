import React from 'react'

// import component
import Drawer from 'react-modern-drawer'

//import styles
import 'react-modern-drawer/dist/index.css'

const StudentDrawer = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <>
            <button onClick={toggleDrawer} className="btn btn-primary">Menu</button>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                className='drawer'
                size={500}
            >
                <button onClick={toggleDrawer} className="btn btn-primary">Menu</button>
                <h2 onClick={() => {toggleDrawer(); props.onChoice("StudentMenu")}}>Mon profil</h2>
                <h2 onClick={toggleDrawer}>Mon équipe</h2>
                <h2 onClick={toggleDrawer}>Ma classe</h2>
                <h2 onClick={toggleDrawer}>Boutique</h2>
                <h2 onClick={toggleDrawer}>Quetes</h2>
                <h2 onClick={toggleDrawer}>Tutoriel</h2>
                <h2 onClick={toggleDrawer}>Paramètres</h2>
            </Drawer>
        </>
    )
}

export default StudentDrawer;