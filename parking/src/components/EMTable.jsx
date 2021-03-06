import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import { lighten } from '@material-ui/core/styles/colorManipulator';

import TextField from '@material-ui/core/TextField';

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, rowCount } = this.props;
    const rows = this.props.rows;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                align='center'
                padding='default'
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
          <TableCell padding="none">
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  rows: PropTypes.array.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 80%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { selectedRow, tableTitle, classes, onConfirmClick, addHandler, editHandler, deleteHadler } = props;
  const selected = selectedRow != null && Object.keys(selectedRow);
  return (
    <Toolbar
      className={classNames(classes.root)}
    >
      <div className={classes.title}>
          <Typography variant="h5" id="tableTitle">
            {tableTitle}
          </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
          {typeof onConfirmClick === 'function' &&
          <Button disabled={!selected} variant="contained" size="small" className={classes.button} onClick={onConfirmClick}>
            <DoneIcon className={classNames()} />
            Confirm
          </Button>
        }
          {typeof addHandler === 'function' &&
          <Tooltip title="Add">
            <IconButton aria-label="Filter list" onClick={addHandler}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        }
       
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  // selected: PropTypes.bool.isRequired,
  tableTitle: PropTypes.string,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    borderTop: 'rgba(122, 123, 124, 0.59) solid 1px',
  },
  table: {
    // minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

let CustomTableCell = props => {
  const { data, row } = props;
  const value = data[row];
  return (
    <TableCell align="right">{value}</TableCell>
  );
};

CustomTableCell.propTypes = {
  data: PropTypes.string,
  row: PropTypes.object,
};

let ActionTableCell = props => {
  const { data, row,  } = props;
  const value = data[row];
  return (
    <TableCell align="right">
      <IconButton >
        <EditIcon color="primary" />
      </IconButton>
       <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
    </TableCell>
  );
};

ActionTableCell.propTypes = {
  data: PropTypes.string,
  row: PropTypes.object,
};

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: '',
    selected: null,
    page: 0,
    rowsPerPage: 5,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
  };

  handleClick = (event, rowObject) => {
    console.log('handleClick', event);
    const { selected } = this.state;
    this.onConfirm(rowObject)
    // this.setState({'selected': rowObject});
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };


  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected && this.state.selected.id === id;

  confirmButtonHandler = (event, rowObject) => {
    console.log('handleConfirmClick', this.state.selected);
    // this.props.onConfirm(this.state.selected);
  };

  addButtonHandler = (event, rowObject) => {
    console.log('handleConfirmClick', this.state.selected);
    this.props.onAdd(this.state);
  };

  editButtonHandler = (event, rowObject) => {
    console.log('handleConfirmClick', this.state.selected);
    this.props.onEdit(rowObject);
  };

  deleteButtonHandler = (event, rowObject) => {
    console.log('handleConfirmClick', this.state.selected);
    this.props.onDelete(rowObject);
  };

  render() {
    const { classes, tableTitle, rows, onConfirm, onAdd, onEdit, onDelete } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const data = this.props.dataSource || [];
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root} elevation="0" square="true">
        <EnhancedTableToolbar
          selectedRow={selected}
          tableTitle={tableTitle}
          onConfirmClick={onConfirm && this.confirmButtonHandler}
          addHandler={onAdd && this.addButtonHandler}
          editHandler={onEdit && this.editButtonHandler}
          deleteHadler={onDelete && this.deleteButtonHandler}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              rows={rows || []}
            />
            <TableBody>
              {stableSort(data || [], getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      {rows.map(row => (
                        <CustomTableCell row={row.id} data={n} />
                      ))}
                      { (onEdit || onDelete) &&
                        <TableCell align="right">
                        { onEdit &&
                          <Tooltip title="Edit">
                            <IconButton aria-label="Filter list" onClick={this.editButtonHandler}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                      }
                      { onDelete &&
                        <Tooltip title="Delete">
                          <IconButton aria-label="Delete" onClick={this.deleteButtonHandler}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      }
                      </TableCell>
                      }
                    </TableRow>

                    
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
                
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}


const mapStateToProps = state => ({
    loading: state.parkingsReducer.loading,
    error: state.parkingsReducer.error,
    selected: state.selected,
});

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.object,
  dataSource: PropTypes.array,
  onConfirm: PropTypes.func,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

// export default withStyles(styles)(EnhancedTable);
// export default { withStyles(styles)(EnhancedTable) as EMTable };

const connectedEnhancedTable = connect(mapStateToProps)(withStyles(styles)(EnhancedTable));
export default connectedEnhancedTable; 

