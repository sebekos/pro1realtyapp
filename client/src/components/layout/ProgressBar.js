import React from "react";
import { connect } from "react-redux";

const ProgressBar = ({ listing: { progressbarvalue, progressbar } }) => {
    return (
        <div className="progressbar">
            {progressbar ? <progress value={progressbarvalue} max="100"></progress> : null}
        </div>
    );
};

const mapStateToProps = state => ({
    listing: state.listing
});

export default connect(mapStateToProps, null)(ProgressBar);
