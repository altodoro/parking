import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { connect } from 'react-redux';
import { faresActions } from '../actions/faresActions';
import EMTable from '../components/EMTable';
import { FareEditDialog } from '../components/FareEditDialog';

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
import FilterListIcon from '@material-ui/icons/FilterList';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import LocationCityIcon from '@material-ui/icons/LocationCity';

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
        // flexGrow: 1,
        // overflow: 'hidden',
        // padding: `0 ${theme.spacing.unit * 3}px`,
        // position: 'absolute',
        // top: 0,
        // bottom: 0,
        // left: 0,
        // right: 0,
        // width: '50%',
        // height: '30%',
        // margin: 'auto',
    },
    rootGrid: {
        flexGrow: 1,
    },
    paper: {
        maxWidth: "100%",
        margin: `${theme.spacing.unit}px auto`,
        // padding: theme.spacing.unit * 2,
    },
    avatar: {
    }
});

class FaresSelection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editDialog: false,
            loading: false,
        };
    }

    componentDidMount() {
        this.props.fetchFares(this.props.parkingID);
        this.handleRateSelect = this.handleRateSelect.bind(this);
        this.openCreateFareDialog = this.openCreateFareDialog.bind(this);
        this.handleCloseFareDialog = this.handleCloseFareDialog.bind(this);
        this.handleDeleteFare = this.handleDeleteFare.bind(this);
        this.handleEditFareDialog = this.handleEditFareDialog.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    handleRateSelect(event) {
        console.log('handleRateSelect');
    }

    openCreateFareDialog(event) {
        this.setState({
            editDialog: true
        });
    }

    handleCloseFareDialog() {
        this.setState({
            editDialog: false
        });
    }

    handleDeleteFare() {

    }

    handleEditFareDialog(fareObject) {
        console.log('handleEditFareDialog');
        this.setState({
            editDialog: true
        });
    }

    handleSelectFare(fareObject) {
        this.props.openFare(fareObject);
    }

    onCreate(fareObject) {
        this.setState({editDialog: false})
        this.props.fareCreate(this.props.parkingID, _.extend(_.clone(fareObject), {type: this.props.fareType}));
    }

    render() {
        const { error, loading, fares, classes } = this.props;
        if (error) {
          return <div>Error! {error.message}</div>;
        }

        if (loading) {
          return <div>Loading...</div>;
        }
        const rows = [
          { id: 'name', numeric: false, disablePadding: true, label: 'Rate Name' },
          { id: 'from', numeric: false, disablePadding: false, label: 'From Date' },
          { id: 'to', numeric: false, disablePadding: false, label: 'To Date' },
          { id: 'description', numeric: false, disablePadding: true, label: 'Description' },
        ];

        return (
                <Paper className={classes.paper} elevation="0" square="true">
                    <Grid container alignItems="justify">
                        <Grid item xs={5}>
                            <Typography variant="h6" gutterBottom >
                                Pick a Rate to proceed
                            </Typography>
                        </Grid>
                    </Grid>
                    <form autoComplete="off" className={classes.rootGrid}>
                        <EMTable
                            tableTitle="Fares List"
                            dataSource={fares}
                            onConfirm={this.handleRateSelect}
                            onClose={this.handleCloseFareDialog}
                            onAdd={this.openCreateFareDialog}
                            onEdit={this.handleEditFareDialog}
                            onDelete={this.handleDeleteFare}
                            rows={rows}/>
                    </form>
                    <div>
                        <FareEditDialog
                            open={this.state.editDialog}
                            onConfirm={this.handleSelectFare}
                            onClose={this.handleCloseFareDialog}
                            onCreate={this.onCreate}
                            formValues={this.state.selectedRow}
                            dialogTitle="Create Fare"
                        />
                    </div>
                </Paper>
            // </div>
            )
    }

}

// const mapStateToProps = state => ({
//     loading: state.parkingsReducer.loading,
//     error: state.parkingsReducer.error,
//     parkingCity: state.parkingsReducer.parkingCity,
//     parkingCityID: state.parkingsReducer.parkingCityID,
// });

function mapStateToProps(state) {
    console.log('mapStateToProps ', state.fares);
    return {
        loading: state.fares.loading,
        error: state.fares.error,
        fareType: state.fareType || 'ACTUAL',
        parkingID: state.parkingZone.parkingID,
        parkingName: state.parkingZone.name,
        parkingSapCode: state.parkingZone.sapCode,
        parkingCity: state.parkingZone.parkingCity,
        fares: state.fares.items,
        rateDialog: state.fares.editDialog,
    }
}


FaresSelection.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    fareType: PropTypes.string,
    parkingID: PropTypes.string,
    parkingName: PropTypes.string,
    parkingSapCode: PropTypes.string,
    parkingCity: PropTypes.string,
    fares: PropTypes.array,
    fetchFares: PropTypes.func,
    parkingChange: PropTypes.func,
    fareCreate: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
    return {
        fetchFares: (parkingID) => {
            dispatch(faresActions.fetchFares(parkingID));
        },
        rateChange: () => {
            console.log('handleParkingChange');
        },
        openFare: (fareObject) => {
            dispatch(faresActions.openFare(fareObject));
        },
        fareCreate: (parkingID, fareObject) => {
            dispatch(faresActions.createFare(parkingID, fareObject));
        }
    }
}

const FareectedFaresSelection = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FaresSelection));
export { FareectedFaresSelection as FaresSelectionPage }; 