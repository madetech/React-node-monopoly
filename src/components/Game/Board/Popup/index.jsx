import React, { Component, PropTypes } from 'react';
import  * as popupActions  from 'redux/actions/popupActions';
import { connect } from 'react-redux';

import {Button, Modal} from 'react-bootstrap';

class Popup extends Component{
    constructor(props) {
        super(props);
    }

    render() {

		let option = this.props.option;
    	if (!option && typeof this.props.action === "string") {
			option = this.props.action;
		}
		// console.log(option);
		option = option ? option.toLowerCase() : "";
		
		let buttons;
		// blank
		if (option === "blank") {
			// do nothing

		// Yes/No
		} else if (option === "yes/no") {
			buttons=(
				<div> 
						<Button onClick={()=>{
							if(typeof this.props.action == 'function') this.props.action();
							this.props.dispatch(popupActions.setShow(false));
						}}>Yes</Button>
						<Button bsStyle="primary" onClick={()=> this.props.dispatch(popupActions.setShow(false))}>No</Button>
				</div>
			);

			// $("#popupyes, #popupno").on("click", function() {
			// 	$("#popupwrap").hide();
			// 	$("#popupbackground").fadeOut(400);
			// });

			// $("#popupyes").on("click", action);

		// Ok
		} else if (option === "") {

			buttons=(
				<div> 
						<Button onClick={()=>{
							if(typeof this.props.action == 'function') this.props.action();
							this.props.dispatch(popupActions.setShow(false));
						}}>Ok</Button>
				</div>
			);

			// $("#popuptext").append("<div><input type='button' value='OK' id='popupclose' /></div>");
			// $("#popupclose").focus();

			// $("#popupclose").on("click", function() {
			// 	$("#popupwrap").hide();
			// 	$("#popupbackground").fadeOut(400);
			// }).on("click", action);

		// unknown
		} 
		// 	else {
		// 		alert("unknown popup option '"+option+"'")
		// 	}

		// Show using animation.
		// $("#popupbackground").fadeIn(400, function() {
		// 	$("#popupwrap").show();
		// });
		let action=()=>{};
		
		if(typeof this.props.action == 'function')
			action=this.props.action;



		const modalInstance = (
			 <Modal show={this.props.show} onHide={action}>
			      <Modal.Body>
<<<<<<< HEAD:src/components/Game/Board/Popup/index.jsx
					  {this.props.image && <img src={this.props.image} style={{height: "50px", width: "53px", float: "left", margin: "8px 8px 8px 0px"}} />}
					  <div  dangerouslySetInnerHTML={{__html:this.props.text}} />
=======
			        <div  dangerouslySetInnerHTML={{__html:this.props.text}} />
>>>>>>> 0d6c6226f9b058493cde3ec406db9949e1d3de76:react/src/components/Game/Board/Popup/index.jsx
			      </Modal.Body>

			      <Modal.Footer>
			     		{buttons}
			      </Modal.Footer>
			 </Modal>
		);

        return <div>
       		{modalInstance}
        </div>
    }
}





function mapStateToProps(state) {
    return { ...state.popupConfig };
}

//connect component with global state
export default connect(mapStateToProps)(Popup);