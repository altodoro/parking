import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Input, InputBase, } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

import Logo from '../components/Logo';

import './Login.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: '#f8f8f8',
    height: '100%',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
  },
  avatar: {
    width: 300,
    top: '25%',
    position: 'absolute',
  },
  button: {
    background: 'linear-gradient(#faa636 100%, #faa636 100%)',

    width: 300,
    height: 42,
    borderRadius: 4,
    fontFamily: "'Open Sans', sans-serif",
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#ffffff',
  }
});

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        // e.preventDefault();

        // this.setState({ submitted: true });
        // const { username, password } = this.state;
        // const { dispatch } = this.props;
        // if (username && password) {
        //     console.log('loging in');
        //     // dispatch(userActions.login(username, password));
        // }
    }

    render() {
        const { username, password, submitted, loading, error } = this.state;
        const { classes } = this.props;

        return (
            <div >
            <div className={classes.root}>
            <div className={' loginFormLogo'}>
            <Logo />
            </div>
                <Paper className={classes.paper + ' loginForm'}>
                    <Typography color="inherit" className={classes.title + ' loginTitle'}>
                    Login
                    </Typography>
                    <div className={classes.margin}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item md={true} sm={true} xs={true}>
                                <FormLabel component="legend" className={' loginFieldLabel'}>Username</FormLabel>
                                <TextField id="username" className={' loginFormField'} fullWidth autoFocus required variant="outlined"/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item md={true} sm={true} xs={true}>
                                <FormLabel component="legend" className={' loginFieldLabel'}>Password</FormLabel>
                                <TextField label="" className="loginFormField" id="username" type="password" fullWidth required variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="center" justify="center">
                            <Button
                                component={Link}
                                fullWidth
                                onClick={this.handleSubmit}
                                to="/selectionform"
                                variant="outlined"
                                color="primary"
                                className={classes.button + ' loginButton'}
                            >OK
                             </Button>
                        </Grid>
                    </div>
                </Paper>
            </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    return {
    username: state.username,
        password: state.password,
        submitted: state.submitted,
        loggingIn: state.authentication,
        loading: state.loading,
        error: state.error
    }
    // const { loggingIn } = state.authentication;
    // return {
    //     loggingIn
    // };
}

const connectedLoginPage = connect(mapStateToProps)(withStyles(styles)(LoginPage));
export { connectedLoginPage as LoginPage }; 