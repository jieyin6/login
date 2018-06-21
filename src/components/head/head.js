import React from 'react'
import './head.css'
import img from './react.png'

class Head extends React.Component{
    render() {
        return (
            <div className="logo">
                <img src={img} alt=''/>
            </div>
        )
    }
}

export default Head;