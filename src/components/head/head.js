import React from 'react'
import './head.css'

class Head extends React.Component{
    render() {
        return (
            <div className="logo">
                <img src={'./react.png'} alt=''/>
            </div>
        )
    }
}

export default Head;