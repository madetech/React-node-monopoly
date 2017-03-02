import React, { Component, PropTypes } from 'react';
import Grid  from 'react-bootstrap/lib/Grid';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem  from 'react-bootstrap/lib/NavItem';

// connects links
import { Link } from 'react-router';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

// remove after react-router was added
// import HelloWorldPage from 'components/HelloWorldPage';

import './bootstrap.css';

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {/*<Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to='/'>1</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav navbar>
                            <LinkContainer to='/'>
                                <NavItem>2</NavItem>
                            </LinkContainer>
                            <LinkContainer to='/'>
                                <NavItem>3</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>*/}
                <Grid>
                    {this.props.children}
                    {/*<HelloWorldPage />*/}
                </Grid>
            </div>
        );
    }
}

export default App;