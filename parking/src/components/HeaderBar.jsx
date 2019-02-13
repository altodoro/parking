import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CardMedia from '@material-ui/core/CardMedia';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

import Logo from './Logo';

import './HeaderBar.css';

const styles = {
  root: {
    fontFamily: 'FiraSans-SemiBold',
    fontSize: 16,
    flexGrow: 1,
  },
  content: {
    paddingLeft: '15%',
    paddingRight: '15%',
  },
  logo: {
    marginRight: 100,
    width: 120,
  },
};

// function ButtonAppBar(props) {
class HeaderBar extends React.Component {
  constructor(props) {
    super(HeaderBar);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="#fafafa">
          <Toolbar className={classes.content}>
            <div className={classes.logo}>
            <Button component={Link} to="/">
              <Logo />
            </Button>
            </div>
            <Button component={Link} color="inherit" to="/selectionform" className={' headerButton'}>
                Home
            </Button>
            <Button color="inherit" className={classes.grow + ' headerButton'}>
                About
            </Button>

            </Toolbar>
          
        </AppBar>
      </div>
    );
  }
}

HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    loading: state.parkingsReducer.loading,
    error: state.parkingsReducer.error,
    selected: state.selected,
});

const connectedHeaderBar = connect(mapStateToProps)(withStyles(styles)(HeaderBar));
export { connectedHeaderBar as HeaderBar };

