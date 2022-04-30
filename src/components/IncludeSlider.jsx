import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeLength } from '../redux/actions';
import Slider from '@mui/material/Slider';
import '../styles/IncludeSlider.css';

function IncludeSlider({ setLength }) {
  return (
    <div className="password-slider-container">
      <span>4</span>
      <Slider
        defaultValue={ 16 }
        min={ 4 }
        max={ 32 }
        sx={ {
          height: '2px',
          '& .MuiSlider-thumb': {
            backgroundColor: 'white',
          },
          '& .MuiSlider-track': {
            border: 'none',
          },
          '& .MuiSlider-rail': {
            backgroundColor: '#bfbfbf',
          },
        } }
        onChange={ ({ target }) => setLength(target.value) }
      />
      <span>32</span>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setLength: (value) => dispatch(changeLength(value)),
});

IncludeSlider.propTypes = {
  setLength: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(IncludeSlider);
