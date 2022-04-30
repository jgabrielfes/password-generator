import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import { withSnackbar } from 'notistack';
import copy from 'clipboard-copy';
import IncludeSlider from '../components/IncludeSlider';
import IncludeSwitch from '../components/IncludeSwitch';
import getRandomPassword from '../services/generatePassword';
import '../styles/PasswordGenerator.css';

function PasswordGenerator({ passwordSettings, enqueueSnackbar }) {
  const [password, setPassword] = useState(localStorage.password
    || 'CLICK GENERATE');

  const handleGenerate = () => {
    const newPassword = getRandomPassword(passwordSettings);
    if (newPassword) localStorage.password = newPassword;
    setPassword(newPassword);
  };

  const handleCopy = ({ target }) => {
    if (target.innerText === 'CLICK GENERATE') {
      enqueueSnackbar('Você precisa gerar uma senha primeiro.', { variant: 'error' });
    } else {
      enqueueSnackbar('Senha copiada para área de transferência!',
        { variant: 'success' });
      copy(target.innerText);
    }
  };

  return (
    <section className="password-generator-container">
      <h1>Password Generator</h1>
      <Button
        color="secondary"
        variant="contained"
        sx={ {
          backgroundColor: '#1e223f',
          borderRadius: '8px',
          fontSize: '1em',
          height: '3.1em',
          overflow: 'hidden',
          textTransform: 'none',
        } }
        onClick={ handleCopy }
      >
        {password || 'Can\'t generate'}
      </Button>
      <section className="password-generator-subcontainer">
        <span>
          LENGTH:
          {' '}
          <span>{ passwordSettings.length }</span>
        </span>
        <IncludeSlider />
      </section>
      <section className="password-generator-subcontainer">
        <span>
          SETTINGS
        </span>
        <IncludeSwitch name="Uppercase" defaultChecked />
        <IncludeSwitch name="Lowercase" defaultChecked />
        <IncludeSwitch name="Numbers" defaultChecked />
        <IncludeSwitch name="Symbols" />
      </section>
      <Button
        variant="contained"
        sx={ {
          backgroundColor: 'transparent',
          backgroundImage: 'linear-gradient(90deg, #697ee1, #6f52a1)',
          fontFamily: 'sans-serif',
          fontWeight: '700',
          height: '3.1em',
        } }
        onClick={ handleGenerate }
      >
        Generate Password
      </Button>
    </section>
  );
}

const mapStateToProps = ({ password }) => ({
  passwordSettings: password,
});

PasswordGenerator.propTypes = {
  passwordSettings: PropTypes.objectOf(PropTypes.any).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(connect(mapStateToProps)(PasswordGenerator));
