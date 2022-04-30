/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import copy from 'clipboard-copy';
import IncludeSlider from '../components/IncludeSlider';
import IncludeSwitch from '../components/IncludeSwitch';
import getRandomPassword from '../services/generatePassword';
import '../styles/PasswordGenerator.css';

class PasswordGenerator extends React.Component {
  constructor() {
    super();
    this.handleGenerate = this.handleGenerate.bind(this);
    this.handleCopy = this.handleCopy.bind(this);

    this.state = {
      lastPassword: localStorage.lastPassword
        ? localStorage.lastPassword : 'CLICK GENERATE',
    };
  }

  handleGenerate() {
    const { password } = this.props;
    const lastPassword = getRandomPassword(password);
    if (lastPassword) localStorage.lastPassword = lastPassword;
    this.setState({ lastPassword });
  }

  handleCopy({ target }) {
    copy(target.innerText);
    alert('Senha copiada para área de transferência');
  }

  render() {
    const { password } = this.props;
    const { lastPassword } = this.state;

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
            textTransform: 'none',
          } }
          onClick={ this.handleCopy }
        >
          {lastPassword || 'Can\'t generate'}
        </Button>
        <div className="password-generator-subcontainer">
          <span>
            LENGTH:
            {' '}
            <span>{ password.length }</span>
          </span>
          <IncludeSlider />
        </div>
        <div className="password-generator-subcontainer">
          <span>
            SETTINGS
          </span>
          <IncludeSwitch name="Uppercase" defaultChecked />
          <IncludeSwitch name="Lowercase" defaultChecked />
          <IncludeSwitch name="Numbers" defaultChecked />
          <IncludeSwitch name="Symbols" />
        </div>
        <Button
          variant="contained"
          sx={ {
            backgroundColor: 'transparent',
            backgroundImage: 'linear-gradient(90deg, #697ee1, #6f52a1)',
            fontFamily: 'sans-serif',
            fontWeight: '700',
            height: '3.1em',
          } }
          onClick={ this.handleGenerate }
        >
          Generate Password
        </Button>
      </section>
    );
  }
}

const mapStateToProps = ({ password }) => ({
  password,
});

PasswordGenerator.propTypes = {
  password: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(PasswordGenerator);
