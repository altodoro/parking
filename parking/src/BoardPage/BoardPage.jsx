import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { parkingsListActions } from '../actions/parkingsListActions';
import { parkingZoneActions } from '../actions/parkingZoneActions';
import { faresActions } from '../actions/faresActions';
import { HeaderBar } from '../components/HeaderBar';
import { FaresSelectionPage } from '../components/FaresSelectionPage';
import EMTable from '../components/EMTable';
import SelectionField from '../components/SelectionField';


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


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
import { lighten } from '@material-ui/core/styles/colorManipulator';
import LocationCityIcon from '@material-ui/icons/LocationCity';

import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const faresTabsStyles = theme => ({
  
});


const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: `${390 - theme.spacing.unit}px`
    },
    root: {
        flexGrow: 1,
    },
    rootGrid: {
        flexGrow: 1,
    },
    boardHeader: {
        maxWidth: "100%",
        padding: '10px 0',
        margin: `${theme.spacing.unit}px auto`,
        marginLeft: '15%',
        marginRight: '15%',
        selectField: {
            marginRight: 20,
        },
    },
    paper: {
        maxWidth: "100%",
        margin: `${theme.spacing.unit}px auto`,
        marginLeft: '15%',
        marginRight: '15%',
        // padding: theme.spacing.unit * 2,
    },
    faresTabsStyles: {
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        },
        tabsRoot: {
            borderBottom: '1px solid #e8e8e8',
        },
        tabsIndicator: {
            backgroundColor: '#1890ff',
        },
        tabRoot: {
            textTransform: 'initial',
            minWidth: 72,
            fontWeight: theme.typography.fontWeightRegular,
            marginRight: theme.spacing.unit * 4,
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:hover': {
                color: '#40a9ff',
                opacity: 1,
            },
            '&$tabSelected': {
                color: '#1890ff',
                fontWeight: theme.typography.fontWeightMedium,
            },
            '&:focus': {
                color: '#40a9ff',
            },
        },
        tabSelected: {},
        typography: {
            padding: theme.spacing.unit * 3,
        },
    }

});

const fareTypeTabs = ['currentRates', 'historicalRates', 'referenceRates'];

class BoardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
        }
    }

    componentDidMount() {
        this.props.fetchParkings();
        this.handleFareTypeChange = this.handleFareTypeChange.bind(this);
    }

    handleFareTypeChange(event, value) {
        // this.setState({tab: value});
        this.props.fareTypeSelect(fareTypeTabs[value]);
    }

    handleParkingChange() {

    }
    handleCityChange() {

    }

    render() {
        const { error, loading, parkingCity, parkingID, parkingName, parkingsList, citiesList, classes, selectedFareType, activeTabIndex } = this.props;
        const activeTab = Math.max(fareTypeTabs.indexOf(selectedFareType), 0);

        if (error) {
          return <div>Error! {error.message}</div>;
        }

        if (loading) {
          return <div>Loading...</div>;
        }
        return (
            <div className={classes.root}>
                <HeaderBar />
                <div className={classes.boardHeader} >
                    <SelectionField
                        className={classes.boardHeader.selectField}
                        outlinedStyle="false"
                        label="City"
                        value={parkingCity}
                        onChange={this.handleCityChange}
                        options={citiesList.map(_ => ({'label': _.city, 'value': _.city}))}
                    />
                    <SelectionField
                        className={classes.boardHeader.selectField}
                        outlinedStyle="false"
                        label="Parking"
                        value={parkingID}
                        onChange={this.handleCityChange}
                        options={parkingsList.map(_ => ({'label': _.name, 'value': _.id}))}
                    />
                </div>
                <Paper className={classes.paper} elevation="0" square="true">
                    <Tabs value={activeTabIndex} onChange={this.handleFareTypeChange}
                    classes={{ root: classes.faresTabsStyles.tabsRoot, indicator: classes.faresTabsStyles.tabsIndicator }}
                    >
                        <Tab label="Current fares" classes={{ root: classes.faresTabsStyles.tabRoot, selected: classes.faresTabsStyles.tabSelected }}/>
                        <Tab label="Historical fares" classes={{ root: classes.faresTabsStyles.tabRoot, selected: classes.faresTabsStyles.tabSelected }}/>
                        <Tab label="Reference fares" classes={{ root: classes.faresTabsStyles.tabRoot, selected: classes.faresTabsStyles.tabSelected }}/>
                    </Tabs>
                    {activeTabIndex === 0 && <TabContainer>
                        <FaresSelectionPage />
                    </TabContainer>}
                    {activeTabIndex === 1 && <TabContainer>Item Two</TabContainer>}
                    {activeTabIndex === 2 && <TabContainer>Item Three</TabContainer>}
                </Paper>

                </div>
            )
        }
}

function mapStateToProps(state) {
    console.log('mapStateToProps ', state);
    return {
        activeTabIndex: Math.max(fareTypeTabs.indexOf(state.fares.selectedFareType), 0),
        activeTab: state.fares.selectFareType,
        parkingName: state.parkingZone.name,
        parkingSapCode: state.parkingZone.sapCode,
        parkingID: state.parkingZone.parkingID,
        parkingCity: state.parkingZone.parkingCity,
        citiesList: state.parkingsReducer.cities || [],
        parkingsList: state.parkingsReducer.parkings || [],
        filteredParkingsList: state.parkingsReducer.filteredParkings,

        loading: state.parkingsReducer.loading,
        error: state.parkingsReducer.error,
        selectedParkingObj: state.parkingZone,
    }
}

BoardPage.propTypes = {
    citiesList: PropTypes.array,
    parkingsList: PropTypes.array,
    filteredParkingsList: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string,
    parkingCity: PropTypes.string,
    parkingCityID: PropTypes.number,
    parkingName: PropTypes.string,
    parkingID: PropTypes.string,

    fetchParkings: PropTypes.func,
    cityChange: PropTypes.func,
    parkingChange: PropTypes.func,
    selectedParkingObj: PropTypes.object,

    fareTypeSelect: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
    return {
        fareTypeSelect: (fareType) => {
            dispatch(faresActions.selectFareType(fareType))
        },
        fetchParkings: () => {
            dispatch(parkingsListActions.fetchParkings());
        },
    }
}

const connectedBoardPage = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BoardPage));
export { connectedBoardPage as BoardPage }; 