import React from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

const axios = require('axios').default;

class QueryView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      inputValid: false,
      inputError: '',
      query: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.getFibonacciValue = this.getFibonacciValue.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({value}, () => {
      this.validateField(value)
    });
  }

  validateField(value) {
    if (value > 0) {
      this.setState({inputValid: true, inputError: ''})
    } else {
      this.setState({inputValid: false, inputError: 'enter only positive numbers'})
    }
  }

  async getFibonacciValue () {
    try {
      const numberFibonacci = this.state.value;
      const response = await axios.get(`http://localhost:4000/calculate?numberFibonacci=${numberFibonacci}`);
      this.setState({query: response.data});
      this.setState({value: '', inputValid: false});
    } catch (error) {
      console.error(error);
    }
  }

  renderQueries = ({numberFibonacci, valueFibonacci}) => {
    if (numberFibonacci) {
      return (
        <div>
          <h2>Number Fibonacci: {numberFibonacci}</h2>
          <h2>Value Fibonacci: {valueFibonacci}</h2>
        </div>
      )
    } else {
      return <h3>Fibonacci sequence, such that each number is the sum of the two preceding ones</h3>
    }
  }

  render() {
    const classes = makeStyles((theme) => ({
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    }));

    let {query, value, inputError, inputValid} = this.state;

    return (
      <div>
        <h1>Enter the fibonacci sequence number</h1>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField

              error={ inputError ? true : false}
              id="outlined-number"
              label={inputError ? "Error" : "Number"}
              helperText={inputError ? inputError : ""}
              type="number"
              value={value}
              onChange={this.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <div style={{ marginTop: 10  }}>
              <Button
                onClick={this.getFibonacciValue}
                size="large"
                variant="contained"
                color="primary"
                disabled={!inputValid}
              >
                Get Fibonacci value
              </Button>
            </div>
          </div>
        </form>
        <div>
          {this.renderQueries(query)}
        </div>
      </div>
    )
  }
}

export default QueryView;
