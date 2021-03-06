import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeInclude } from '../redux/actions';
import Switch from '@mui/material/Switch';

function IncludeSwitch({ name, defaultChecked, setInclude }) {
  return (
    <label htmlFor={ `switch-${name}` }>
      Include {name}
      <Switch
        id={ `switch-${name}` }
        color="secondary"
        defaultChecked={ defaultChecked }
        onChange={ ({ target }) => setInclude(name.toLowerCase(), target.checked) }
      />
    </label>
  );
}

IncludeSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool,
  setInclude: PropTypes.func.isRequired,
};

IncludeSwitch.defaultProps = {
  defaultChecked: false,
};

const mapDispatchToProps = (dispatch) => ({
  setInclude: (include, value) => dispatch(changeInclude(include, value)),
});

export default connect(null, mapDispatchToProps)(IncludeSwitch);
