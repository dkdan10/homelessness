import { connect } from 'react-redux';

import About from './about.js';
import { getHomelessShelterCensusData } from '../../actions/data_actions.js';

const mapStateToProps = state => {
    return {
        homelessShelterCensusData: state.data.homelessShelterCensus
    }
};

const mapDispatchToProps = dispatch => ({
    getHomelessShelterCensusData: () => dispatch(getHomelessShelterCensusData())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(About);
