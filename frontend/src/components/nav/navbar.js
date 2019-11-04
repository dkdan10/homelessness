import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import './navbar.scss'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout()
        this.props.history.push("/login")
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div>
                    <Link className="nav-link" to={'/about'}>About</Link>
                    <Link className="nav-link" to={'/connect'}>Connect</Link>
                    <Link className="nav-link" to={'/resources'}>Additional Resources</Link>
                    <span className="nav-link" onClick={this.logoutUser}>Logout</span>
                </div>
            );
        } else {
            return (
                <div>
                    <Link className="nav-link" to={'/about'}>About</Link>
                    <Link className="nav-link" to={'/connect'}>Connect</Link>
                    <Link className="nav-link" to={'/resources'}>Additional Resources</Link>
                    <Link className="nav-link" to={'/signup'}>Signup</Link>
                    <Link className="nav-link" to={'/login'}>Login</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="nav-bar">
                <h1 className="logo">Home Helper</h1>
                {this.getLinks()}
            </div>
        );
    }
}

export default withRouter(NavBar);
