import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux'
import { pwresetsave } from '../../Redux/actions/auth';
import { setAlert } from '../../Redux/actions/alert';
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner';


const Pwreset = ({ pwresetsave, auth: { loading }, match, history, setAlert }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
        hash: match.params.hash
    });

    const { email, password, password2, hash } = formData;

    const onChangeHandler = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmitHandler = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            pwresetsave(email, password, match.params.hash, history);
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Password Reset</h1>
            <form className="form" onSubmit={e => onSubmitHandler(e)}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChangeHandler(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChangeHandler(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={e => onChangeHandler(e)}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Reset" />
            </form>
            {loading ? <Spinner /> : null}
        </Fragment>
    )
}

Pwreset.propTypes = ({
    pwresetsave: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired
});

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { pwresetsave, setAlert })(Pwreset);
