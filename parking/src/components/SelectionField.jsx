import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import './SelectionField.css';

import _ from 'lodash';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  field: {
    minWidth: 200,
    marginRight: 20
  },
});

class SelectField extends React.Component {
  state = {
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
    this.props.onChange(event.target.value);
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { elementName, classes, label, value, options=[], onChange, labelPosition, outlinedStyle } = this.props;
    const elementId = _.uniqueId(elementName);
    return (
        <FormControl className={outlinedStyle && ' formControlClass'}>
          <Select
            native
            value={value}
            onChange={this.handleChange}
            className={classes.field + ' mainSelectionField'}
            input={
              <OutlinedInput
                className={classes.outlinedInput}
                labelWidth={this.state.labelWidth}
                id={elementId}
              />
            }
            startAdornment={<InputAdornment position="start">{label}:</InputAdornment>}
          >
          <option value="" />
            {options.map(option => (
              <option value={option.value}>{option.label}</option>
            ))}
            </Select>
        </FormControl>
    );
  }
}

SelectField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectField);