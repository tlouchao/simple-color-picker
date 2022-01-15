import React, {Component} from "react"

class PaletteSingle extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div style={this.props.style} className='palette-single'>
                <span className='palette-single-hex-color'>#FF00FF</span>
            </div>
        )
    }
}

export default PaletteSingle