import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from './actions';

function Dashboard({fetchUser}) {
  fetchUser(); // just for test purpose;
  return (
      <div>
        <Helmet title='Dashboard' />

        <h2>Dashbaord</h2>
        <p>Chunk loaded.</p>
        <Link to="/">Back</Link>
      </div>
  );
} 

Dashboard.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { fetchUser })(Dashboard);
