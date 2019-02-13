import React from 'react';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

import * as moment from 'moment';

import { connect } from 'react-redux';
import { faresActions } from '../actions/faresActions';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import _ from 'lodash';

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            id: other.id,
            value: values.value,
            required: other.required,
          },
        });
      }}
      thousandSeparator
      suffix=""
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    numberField: {
        margin: {
            margin: theme.spacing.unit,
        },
        withoutLabel: {
            marginTop: theme.spacing.unit * 3,
        },
        textField: {
            flexBasis: 200,
        },
    }
});

class FormDialog extends React.Component {
    constructor(props) {
        super(props)
        this.requiredFields = ['name', 'from', 'to', 'normalDayPeriodMax', 'specialDayPeriodMax'];
        this.state = {
            open: false || this.props.open,
            ifFormValid: false,
            alert: '',
            textmask: '',
            numberformat: '',
            currency: '€',
            formValues: {}
        };
        this.handleCreate = this.handleCreate.bind(this);
    }
  componentDidMount() {
    this.setState({ open: this.props.open });
  }

  handleClickOpen = () => {
    this.setState({ open: this.state.open });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

  handleCreate() {
      const invalidFields = this.requiredFields.filter(fieldName =>
        (this.state.formValues[fieldName] == "" || this.state.formValues[fieldName] == null) && fieldName
      );
      if (invalidFields && invalidFields.length > 0) {
        alert('invalid Fields');
      } else {
        this.props.onCreate(this.state.formValues)
      }
  }

  onChange = (event) => {
    const value = event.target.type === 'date' ? moment(event.target.value).format('DD/MM/YYYY') : event.target.value;
    this.setState({formValues: _.extend(_.clone(this.state.formValues), {[event.target.id]: value})});
  }

  isRequired = (textField) => {

  }

  render() {
    const { classes, handleClose, dialogTitle } = this.props;
    const { textmask, numberformat, currency, fromDate, toDate, normalDayPeriodMax, specialDayPeriodMax } = this.state;
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
          <DialogContent>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            required={this.requiredFields.indexOf('name') >= 0}
            id="name"
            label="Name"
            onChange={this.onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            id="description"
            required={this.requiredFields.indexOf('description') >= 0}
            label="Description"
            onChange={this.onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="from"
            label="From Date"
            required={this.requiredFields.indexOf('from') >= 0}
            className={classes.formControl}
            type="date"
            value={fromDate}
            onChange={this.onChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="to"
            label="To Date"
            required={this.requiredFields.indexOf('to') >= 0}
            className={classes.formControl}
            type="date"
            value={toDate}
            onChange={this.onChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.formControl}
            label="Normal Day Period Max"
            required={this.requiredFields.indexOf('normalDayPeriodMax') >= 0}
            value={normalDayPeriodMax}
            id="normalDayPeriodMax"
            onChange={this.onChange}
            InputProps={{
              inputComponent: NumberFormatCustom,
              endAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.formControl}
            label="Special Day Period Max"
            required={this.requiredFields.indexOf('specialDayPeriodMax') >= 0}
            value={specialDayPeriodMax}
            id="specialDayPeriodMax"
            onChange={this.onChange}
            InputProps={{
              inputComponent: NumberFormatCustom,
              endAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCreate} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        loading: state.fares.loading,
        error: state.fares.error,
        rate: state.fares.createdRate,
        parkingName: state.parkingZone.name,
        sapCode: state.parkingZone.sapCode,
        type: state.fares.type,
    }
}


FormDialog.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    rate: PropTypes.obj,
    parkingName: PropTypes.string,
    sapCode: PropTypes.string,
    type: PropTypes.string,
    doRateCreate: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
    return {
    }
}

const connectedFormDialog = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormDialog));
export { connectedFormDialog as FareEditDialog }; 