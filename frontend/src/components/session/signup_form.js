import React from 'react';
import { withRouter } from 'react-router-dom';
import './session.scss'

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        if (Object.keys(this.props.errors).length) {
            this.props.removeSessionErrors()
        }
    }

    // REFACTOR THIS WHEN THERE IS LOCAL FORM VALIDATION FOR ERRORS
    static getDerivedStateFromProps(nextProps) {
        if (nextProps.errors) {
            return { errors: nextProps.errors };
        }
        else return null;
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {
            email: this.state.email.toLowerCase(),
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.signup(user);
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className="session-form-container">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="session-header">Sign Up</h1>
                    <div className="session-fields">
                        <div className="session-field">
                            <label>Email</label>
                            <input type="text"
                                value={this.state.email}
                                onChange={this.update('email')}
                                placeholder="Email"
                            />
                        </div>
                        <div className="session-field">
                            <label>Username</label>
                            <input type="text"
                                value={this.state.username}
                                onChange={this.update('username')}
                                placeholder="Username"
                            />
                        </div>
                        <div className="session-field">
                            <label>Password</label>
                            <input type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                placeholder="Password"
                            />
                        </div>
                        <div className="session-field">
                            <label>Confirm Password</label>
                            <input type="password"
                                value={this.state.password2}
                                onChange={this.update('password2')}
                                placeholder="Confirm Password"
                            />
                        </div>
                        <div className="session-submit">
                            <input className="session-btn" type="submit" value="Submit" />
                        </div>
                    </div>
                    {this.renderErrors()}
                </form>
            </div>
        );
    }
}

export default withRouter(SignupForm);
