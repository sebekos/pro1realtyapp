import React, { useEffect, Fragment } from "react";
import { getOffice } from "../../Redux/actions/office";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import OfficeMap from "./OfficeMap";
import Spinner from "../layout/Spinner";

const Office = ({ getOffice, office: { office, loading } }) => {
    useEffect(() => {
        getOffice();
    }, [getOffice]);

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className="dash-profile bg-light">
                <h1 className="large text-primary">Main Office</h1>
                <ul>
                    <li className="text-secondary">
                        <span className="span-item">Phone: </span>
                        {office.phone}
                    </li>
                    <li className="text-secondary">{office.address}</li>
                    <li className="text-secondary">
                        {office.city}, {office.state} {office.zipcode}
                    </li>
                    {office.fax ? <li className="text-secondary">Fax: {office.fax}</li> : null}
                </ul>
            </div>
            <OfficeMap />
        </Fragment>
    );
};

Office.propTypes = {
    getOffice: PropTypes.func.isRequired,
    office: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    office: state.office
});

export default connect(mapStateToProps, { getOffice })(Office);
