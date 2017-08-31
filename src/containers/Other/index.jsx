import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOther } from './actions';

function Other({fetchOther}) {
  fetchOther(); // just for test purpose;
  return (
      <div>
        <Helmet title='Another page' />

        <h2>Another page</h2>
        <p>Another Chunk loaded.</p>
        <Link to="/">Back</Link>
      </div>
  );
} 

Other.propTypes = {
  fetchOther: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { fetchOther })(Other);
