import React, { Fragment, useState, useEffect } from 'react';
import ImageUploader from 'react-images-upload';
import { uploadPhotos, getListing } from '../../Redux/actions/listing';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AddPhotos = ({
  uploadPhotos,
  match,
  listing: { listing, loading, progressbar },
  getListing
}) => {
  return <div className='container'>test</div>;
};

AddPhotos.propTypes = {
  getListing: PropTypes.func.isRequired,
  uploadPhotos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  listing: state.listing
});

export default connect(
  mapStateToProps,
  { uploadPhotos, getListing }
)(AddPhotos);
