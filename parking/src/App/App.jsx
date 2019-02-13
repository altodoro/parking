import React from 'react';
// require('../static/images/favicon.ico');

import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { history } from '../History';
import { parkingsListActions } from '../actions/parkingsListActions';
import { SelectionFormPage } from '../SelectionFormPage';
import { FaresSelectionPage } from '../components/FaresSelectionPage';
import { BoardPage } from '../BoardPage';
import { LoginPage } from '../LoginPage';

import './App.css';

import LoadMask from '../LoadMask';

const styles = theme => ({
})

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            submitted: false,
        };
        history.listen((location, action) => {
            // clear alert on location change
            // dispatch(alertActions.clear());
        });
        const { dispatch } = this.props;
    }

    componentDidMount() {
        this.setState({
            loading: true
        });

    }

    render() {
        const { error, loading, classes } = this.props;

        if (error) {
          return <div>Error! {error.message}</div>;
        }

        if (loading) {
          return <div>Loading...</div>;
        }
        console.log(this.state.loading);
        // if (this.state.loading) {
        //     return (
        //         <div>
        //             <LoadMask />
        //         </div>)
        // }
        const THEME = createMuiTheme({
            typography: {
                "fontFamily": "\"Fira Sans\", \"Open Sans\", \"Arial\", sans-serif",
                "fontSize": 14,
                "fontWeightLight": 300,
                "fontWeightRegular": 400,
                "fontWeightMedium": 500
            },
            palette: {
                primary: {
                    main: '#7a7b7c',
                }
            },
            overrides: {
                MuiInputBase: {
                    root: {
                        // color: 'blue',
                        backgroundColor: "#ffffff",
                        fontSize: 14,
                    },
                },
                MuiSelect: {
                    root: {
                        fontWeight: 600,
                    },
                },
                // .MuiOutlinedInput-root-858.MuiOutlinedInput-focused-859 .MuiOutlinedInput-notchedOutline-865
                MuiOutlinedInput: {
                    input: {
                        padding: '11.5px 14px',
                    },
                    inputAdornedStart: {
                        paddingLeft: 14,
                    },
                    // root                         focused: {
                    //         borderColor: 'red',
                    //     },
                    // },
                    notchedOutline: {
                        borderColor: '',
                    }
                },
                MuiButtonBase: {
                    backgroundColor: "#faa636"
                },
                MuiTab: {
                    root: {
                        textTransform: 'initial',
                        fontSize: 14,
                        fontWeight: 500,
                        fontStyle: 'normal',
                        fontStretch: 'normal',
                        lineHeight: 'normal',
                        letterSpacing: 'normal',
                        color: '#7a7b7c',
                    },
                    selected: {
                        fontWeight: 600,
                        color: '#2e3032',
                    },
                },
                // MuiOutlinedInput: {

                // },
                MuiPrivateTabIndicator: {
                    colorSecondary: {
                        display: 'none',
                    }
                }
            },
            
        });
        return (
             <MuiThemeProvider theme={THEME}>
                <div className="container" className={classes.root} >
                    <div className="col-sm-8 col-sm-offset-2" id="www">
                        <Router history={history}>
                            {loading ? <div>Loading...</div> : 
                            <div>
                                <Route exact path="/" component={LoginPage} />
                                <Route path="/selectionform" component={SelectionFormPage} />
                                <Route path="/board" component={BoardPage} />
                            </div>
                            }
                        </Router>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

// const mapStateToProps = state => ({
//         username: state.username,
//         password: state.password,
//         submitted: state.submitted,
//         loggingIn: state.authentication,
//         loading: state.loading,
//         error: state.error
//     })


App.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    submitted: PropTypes.bool,
    loggingIn: PropTypes.bool,
    doLogin: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.string,
    parkinngZone: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
    return {
        doLogin: () => {
            console.log('Login');
        }
    }
}

function mapStateToProps(state) {
    const { parkinngZone, username, loading, error } = state;
    return {
        parkinngZone,
        username,
        loading: state.loading,
        error: state.error
    };
}

const connectedApp = connect(mapStateToProps)(withStyles(styles)(App));
export { connectedApp as App };