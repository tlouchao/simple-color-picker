import React from 'react'

class Canvas extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <canvas id={this.props.id} width={this.props.width} height={this.props.height}
            onMouseOver={this.props.handleMouseOver} 
            onMouseDown={this.props.handleMouseDown}
            onMouseUp={this.props.handleMouseUp}>
            </canvas>
        )
    }
}

export default Canvas