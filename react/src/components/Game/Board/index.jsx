import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Square from './Square';
import ControlBoard from './ControlBoard';

//don't import - need to be recutting
//import '../monopoly.css';

class Board extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props);

        let bottom =[];
        for(let i=0;i<this.props.squareConfig.squares.length/4+1; i++){
            let sq=this.props.squareConfig.squares[i];
            if(i==0 || i==this.props.squareConfig.squares.length/4-1)
                bottom.push( 
                    (<td key={i} className="cell board-corner">
                        <Square {...sq} index={i} key={i}/>
                    </td>)
                )
            else
                 bottom.push( 
                    (<td key={i} className="cell board-bottom">
                        <Square {...sq} index={i} key={i}/>
                    </td>)
                )
        }
        bottom=bottom.reverse();
        
        let top=[];
        for(let i=this.props.squareConfig.squares.length/2;i<(this.props.squareConfig.squares.length/4)+(this.props.squareConfig.squares.length/2)+1; i++){
            let sq=this.props.squareConfig.squares[i];
            if(i==0 || i==this.props.squareConfig.squares.length/4-1)
                top.push( 
                    <td key={i} className="cell board-corner">
                        <Square {...sq} index={i} key={i}/>
                    </td>
                )
            else
                 top.push( 
                    <td key={i} className="cell board-top">
                        <Square {...sq} index={i} key={i}/>
                    </td>
                )
        }


        let middle=[];
        for(let i=this.props.squareConfig.squares.length/4+1;i<this.props.squareConfig.squares.length/2; i++){
            let sqLeft=this.props.squareConfig.squares[i];
            let sqRight=this.props.squareConfig.squares[this.props.squareConfig.squares.length-i+this.props.squareConfig.squares.length/4];
            middle.push(
                <tr>
                    <td key={i} className="cell board-left">
                        <Square {...sqLeft} index={i} key={i}/>
                    </td>
                    <td colSpan={9} className="board-center">
                        <div id="jail"></div>
                    </td>
                    <td key={this.props.squareConfig.squares.length-i} className="cell board-right">
                        <Square {...sqRight} index={this.props.squareConfig.squares.length-i} key={this.props.squareConfig.squares.length-i}/>
                    </td>
                </tr>
            )
        }

        middle=middle.reverse();

        return (
            <div>
                BOARD
                    <table id="board">
                        <tbody>
                            <tr>{top}</tr>
                            {middle}
                           
                            <tr>{bottom}</tr>
                        </tbody>
                    </table>
                <div id="control">
                     <ControlBoard/>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {squareConfig: state.squareConfig};
}

//connect component with global state
export default connect(mapStateToProps)(Board);