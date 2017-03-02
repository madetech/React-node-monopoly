import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Square from './Square';
import ControlBoard from './ControlBoard';

//don't import - need to be recutting
//import '../monopoly.css';
import '../monopoly2.css';

class Board extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props);

        let bottom =[];
        for(let i = 0; i<this.props.squareConfig.squares.length/4+1; i++){
            let sq=this.props.squareConfig.squares[i];
            // console.log('his.props.game.playerToSquare',this.props.game.playerToSquare)
            let playerToSquare = this.props.game.playerToSquare.filter(item =>{
                // console.log('i',i);
                // console.log('item.square',item);
                return item.square == i;
            });


            if(i==0 || i==this.props.squareConfig.squares.length/4-1)
                bottom.push( 
                    (
                        <Square {...sq}
                            class="cell board-corner"
                                playerToSquare={playerToSquare}
                                index={i}
                                key={`bottom-${i}`}/>
                    )
                )
            else
                 bottom.push( 
                    (
                        <Square {...sq}
                                class="cell board-bottom"
                                playerToSquare={playerToSquare}
                                index={i}
                                key={`bottom-${i}`}/>
                    )
                )
        }
        bottom=bottom.reverse();
        
        let top=[];
        for(let i=this.props.squareConfig.squares.length/2;i<(this.props.squareConfig.squares.length/4)+(this.props.squareConfig.squares.length/2)+1; i++){
            let sq=this.props.squareConfig.squares[i];
         
            let playerToSquare = this.props.game.playerToSquare.filter(item =>{
                return item.square == i;
            });


            if(i==0 || i==this.props.squareConfig.squares.length/4-1)
                top.push(
                        <Square {...sq}
                            class="cell board-corner"
                                playerToSquare={playerToSquare}
                                index={i}
                                key={`top-${i}`}/>
                )
            else
                 top.push(
                        <Square {...sq}
                                class="cell board-top"
                                playerToSquare={playerToSquare}
                                index={i}
                                key={`top-${i}`}/>
                )
        }


        let middle=[];
        let jail = true;
        for(let i=this.props.squareConfig.squares.length/4+1;i<this.props.squareConfig.squares.length/2; i++){
            let sqLeft=this.props.squareConfig.squares[i];
            let sqRight=this.props.squareConfig.squares[this.props.squareConfig.squares.length-i+this.props.squareConfig.squares.length/4];
            
            let playerToSquare = this.props.game.playerToSquare.filter(item =>{
                return item.square == i;
            });

            let playerToSquare1 = this.props.game.playerToSquare.filter(item =>{
                return item.square == this.props.squareConfig.squares.length-i+this.props.squareConfig.squares.length/4;
            });

            middle.push(
                <tr key={`board-middle-${i}`}>
                        <Square {...sqLeft}
                                class="cell board-left"
                                playerToSquare={playerToSquare}
                                index={i}
                                key={`middle-${i}`}/>
                    <td colSpan={9} className="board-center">
                        {jail && <Square
                            playerToSquare={playerToSquare}
                            index={i}
                            key={`jail-${i}`}
                            jail="true"
                        />}
                    </td>
                        <Square {...sqRight}
                                class="cell board-right"
                                playerToSquare={playerToSquare1}  
                                index={this.props.squareConfig.squares.length-i+this.props.squareConfig.squares.length/4}
                                key={`middle-${this.props.squareConfig.squares.length-i+this.props.squareConfig.squares.length/4}`}/>
                </tr>
            )
            jail = false;
        }

        middle=middle.reverse();

        return (
            <div>
                <table id="board">
                        <tbody>
                            <tr key={`board-top`}>{top}</tr>
                            {middle}
                            <tr key={`board-bottom`}>{bottom}</tr>
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
    return {squareConfig: state.squareConfig, game: state.gameFunctionality};
}

//connect component with global state
export default connect(mapStateToProps)(Board);