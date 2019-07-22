import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getAgents } from '../../Redux/actions/agent';
import AgentItem from './AgentItem';

const Agents = ({ getAgents, agent: { agents, loading } }) => {
    useEffect(() => {
        getAgents();
    }, [loading]);


    return loading ? <Spinner /> :
        <Fragment>
            <div className="posts">
                {agents.map(agent => (
                    <AgentItem key={agent._id} agent={agent}>Listing</AgentItem>
                ))}
            </div>
        </Fragment>
}

Agents.propTypes = {
    getAgents: PropTypes.func.isRequired,
    agent: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    agent: state.listing
})

export default connect(mapStateToProps, { getAgents })(Agents);
