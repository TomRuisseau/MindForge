import React, { forwardRef, useImperativeHandle } from 'react';
import '../Styles/studentDrawer.css'

// import component
import Drawer from 'react-modern-drawer'

//import styles
import 'react-modern-drawer/dist/index.css'

const StudentDrawer = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    useImperativeHandle(ref, () => ({
        toggleDrawerOutside() {
            setIsOpen((prevState) => !prevState)
        }
    }));

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <>
            <div className='menu-student'>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                className='drawer'
                size={500}
                style={{ backgroundColor: "#0f3c4c", color: "white" }}
            >
                <div className='mt-5 drawerStudent'>
                    <button onClick={toggleDrawer} className="btn btn-primary">Menu</button>
                    <h2 onClick={() => { toggleDrawer(); props.onChoice("StudentProfile") }}>Mon profil</h2>
                    <h2 onClick={() => { toggleDrawer(); props.onChoice("StudentTeam") }}>Mon équipe</h2>
                    <h2 onClick={() => { toggleDrawer(); props.onChoice("StudentClass")}}>Ma classe</h2>
                    <h2 onClick={() => { toggleDrawer(); props.onChoice("Shop") }}>Boutique</h2>
                    <h2 onClick={() => { toggleDrawer(); props.onChoice("Quetes") }}>Quetes</h2>
                    <h2 onClick={() => { toggleDrawer(); props.onChoice("Tutorial") }}>Tutoriel</h2>
                    <h2 onClick={toggleDrawer}>Paramètres</h2>
                </div>
            </Drawer>
            </div>
        </>
    )
});

export default StudentDrawer;