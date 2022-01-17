import React from "react"
import Navbar from "./components/Navbar"
import Palette from "./components/Palette"

const App = () => {
    return (
        <div className='wrapper'>
            <div className='app'>
                <Navbar />
                <Palette />
            </div>
        </div>
    )
}

export default App