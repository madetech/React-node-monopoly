import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions/playerRowActions';
import {FormControl} from 'react-bootstrap';
import { colors, player_types } from 'config/playerConfig';

class PlayerRow extends Component {

    constructor(props) {
        super(props);
    }

    handleColorChange=(e)=>{
        let col = colors.filter(i=> i.name.toLowerCase() == e.target.value )[0]; 
        this.props.dispatch(actions.setColor({player:this.props.index, color:col}))
    }

    handleTypeChange=(e)=>{
        this.props.dispatch(actions.setType({player:this.props.index, type:e.target.value}))
    }

    handleNameChange=(e)=>{
        this.props.dispatch(actions.setName({player:this.props.index, name:e.target.value}))
    }

    render() {

        let color_options = [];
        for( let i in colors ) 
                color_options.push(
                    (<option 
                            key={i} 
                            value={colors[i].name.toLowerCase()} 
                            /*selected={this.props.players.length && colors[i].name.toLowerCase() == this.props.players[this.props.index].color.name.toLowerCase()}*/    
                        >
                            {colors[i].name}
                    </option>)
                ) 
        let type_options = [];
        for( let i in player_types ) 
                type_options.push(
                    (<option 
                            key={i} 
                            value={player_types[i].type} 
                            /*selected={this.props.players.length && player_types[i].type == this.props.players[this.props.index].type}*/    
                        >
                            {player_types[i].name}
                    </option>)
                ) 
        let name=this.props.players.length?this.props.players[this.props.index].name:'';

        return (
           <div className="row">
                <div className="col-md-4">
                    Player 
                    <FormControl
                        type="text"
                        placeholder="Enter text"
                        value={name}
                        onChange={this.handleNameChange}
                    />
                </div>
                <div className="col-md-4">
                    Color
                    <FormControl componentClass="select" value={this.props.players[this.props.index].color.name.toLowerCase()} onChange={this.handleColorChange}>
                        {color_options}
                    </FormControl>

                </div>
                <div className="col-md-4">
                    Type
                    <FormControl componentClass="select" value={this.props.players[this.props.index].type} onChange={this.handleTypeChange}>
                        {type_options}
                    </FormControl>
                </div>
           </div>
        );
    }
}

function mapStateToProps(state) {
    return {...state.playersConfig};
}

//connect component with global state
export default connect(mapStateToProps)(PlayerRow);