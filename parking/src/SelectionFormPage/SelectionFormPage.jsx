import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { parkingsListActions } from '../actions/parkingsListActions';
import { parkingZoneActions } from '../actions/parkingZoneActions';
import { HeaderBar } from '../components/HeaderBar';
import SelectionField from '../components/SelectionField';

import EMTable from '../components/EMTable';

import {
    Paper,
    withStyles,
    Grid,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Input,
    InputBase,
    Avatar,
    Hidden,
    Toolbar,
    NativeSelect,
    OutlinedInput,
    FilledInput,
    InputLabel,
    MenuItem,
    FormHelperText,
    FormControl,
    Select,
} from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { lighten } from '@material-ui/core/styles/colorManipulator';


import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: `${390 - theme.spacing.unit}px`
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    root: {
        flexGrow: 1,
    },
    rootGrid: {
        flexGrow: 1,
    },
    paper: {
        maxWidth: "100%",
        margin: `${theme.spacing.unit}px auto`,
        marginLeft: '15%',
        marginRight: '15%',
        padding: theme.spacing.unit * 2,
    },
    avatar: {
    }
});

class SelectionFormPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchParkings();
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleParkingChange = this.handleParkingChange.bind(this);
        this.handleConfirmClick = this.handleConfirmClick.bind(this);

    }

    handleCityChange(event) {
        this.props.cityChange(this.props.citiesList, event.target.value, this.props.parkingsList);
    }

    handleParkingChange = name => event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.parkingChange(this.props.citiesList, event.target.value);
    }

    handleConfirmClick(event) {
        console.log('handleConfirmClick',event);
        this.props.parkingZoneChange(event);
    }

    render() {
        const { error, loading, citiesList, parkingsList, parkingCity, parkingCityID, filteredParkingsList, classes } = this.props;
        if (error) {
          return <div>Error! {error.message}</div>;
        }

        if (loading) {
          return <div>Loading...</div>;
        }
        const rows = [
          { id: 'name', numeric: false, disablePadding: true, label: 'Parking Name' },
          { id: 'city', numeric: false, disablePadding: false, label: 'City' },
          { id: 'sapCode', numeric: false, disablePadding: false, label: 'SAP CODE' },
        ];

        return (
            <div className={classes.root}>
                <HeaderBar />
                <Paper className={classes.paper} elevation="0">
                    <Grid container justify="center" alignItems="center">
                      <img alt="empark" className={classes.avatar} src="data:image/png;base64,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
" />
                    </Grid>
                    <Typography variant="h6" gutterBottom >
                        Pick a city and a parking zone
                    </Typography>
                    <form autoComplete="off" className={classes.rootGrid}>
                        <Grid container spacing={8} justify="center" alignItems="center">
                            <Grid item md={true} sm={true} xs={true}>
                                <FormControl className={classes.formControl} >
                                  <InputLabel shrink htmlFor="citySelector-label-placeholder">
                                    City:
                                  </InputLabel>
                                  <SelectionField
                                        label="City"
                                        outlinedStyle=""
                                        value={parkingCity}
                                        onChange={this.handleCityChange}
                                        options={citiesList.map(_ => ({'label': _.city, 'value': _.city}))}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <EMTable
                            tableTitle="Parking Zones"
                            dataSource={parkingsList}
                            onConfirm={this.handleConfirmClick}
                            
                            rows={rows}/>
                    </form>
                </Paper>
            </div>
        );
  }
};

function mapStateToProps(state) {
    console.log('mapStateToProps ', state.parkingsReducer);
    return {
        citiesList: state.parkingsReducer.cities || [],
        parkingsList: state.parkingsReducer.parkings || [],
        filteredParkingsList: state.parkingsReducer.filteredParkings,
        loading: state.parkingsReducer.loading,
        error: state.parkingsReducer.error,
        parkingCity: state.parkingsReducer.parkingCity,
        parkingCityID: state.parkingsReducer.parkingCityID,
        selectedParking: state.parkingZone,
    }
}

SelectionFormPage.propTypes = {
    citiesList: PropTypes.array,
    parkingsList: PropTypes.array,
    filteredParkingsList: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string,
    parkingCity: PropTypes.string,
    parkingCityID: PropTypes.number,
    parkingName: PropTypes.string,
    parkingID: PropTypes.number,

    fetchParkings: PropTypes.func,
    cityChange: PropTypes.func,
    parkingChange: PropTypes.func,
    selectedParking: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
    return {
        fetchParkings: () => {
            dispatch(parkingsListActions.fetchParkings());
        },
        cityChange: (ciliesList, cityID) => {
            dispatch(parkingsListActions.filterParkings(cityID));
        },
        parkingZoneChange: (parkingZone) => {
            dispatch(parkingZoneActions.setParkingZone(parkingZone));
        }
    }
}

const connectedSelectionFormPage = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectionFormPage));
export { connectedSelectionFormPage as SelectionFormPage }; 