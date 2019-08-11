import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux'
import { pwreset } from '../../Redux/actions/auth';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types'

const Pwreset = ({ pwreset, auth: { loading } }) => {
    const [email, setEmail] = useState('');

    const onChangeHandler = e => setEmail(e.target.value);

    const onSubmitHandler = async e => {
        e.preventDefault();
        pwreset(email);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Password Reset</h1>
            <p className="lead"><i className="fas fa-user"></i> Enter the email associated with your account.</p>
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
                <input type="submit" className="btn btn-primary" value="Submit" />
            </form>
            {loading ? <Spinner /> : null}
        </Fragment>
    )
}

Pwreset.propTypes = ({
    pwreset: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
});

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { pwreset })(Pwreset);
