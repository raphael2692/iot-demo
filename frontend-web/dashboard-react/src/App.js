import { useState, useEffect } from "react";

import Chart from "react-apexcharts";

// import Grid from "@material-ui/core/Grid";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function App() {
  const [tempArray, setTempArray] = useState([]);

  useEffect(() => {
    const fetchAllTemp = async () => {
      const response = await fetch("http://0.0.0.0:8000/temperatures/");
      const fetchedTemp = await response.json();
      // console.log(fetchedTemp);
      setTempArray(fetchedTemp);
    };
    const interval = setInterval(fetchAllTemp, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const renderTr = (array) =>
    array.map((el) => (
      <TableRow key={el.id}>
        <TableCell>{el.temperatura}</TableCell>
        <TableCell>{el.data}</TableCell>
      </TableRow>
    ));

  let average = (array) => array.reduce((a, b) => a + b) / array.length;

  function getAverageTemp(array) {
    var temp = [];

    array.forEach((el) => temp.push(Number(el.temperatura)));

    // console.log(temp);
    try {
      return average(temp);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  function getTempArray(array) {
    var temp = [];
    try {
      array.forEach((el) => temp.push(Number(el.temperatura)));
      // console.log('****');
      // console.log(temp);
      var series = [
        {
          name: "Temperature",
          data: temp,
        },
      ];
      return series;
    } catch (error) {
      console.log(error);
      return [{}];
    }
  }

  function getLabelArray(array) {
    var temp = [];
    try {
      array.forEach((el) => temp.push(el.data));
      // console.log('****');
      // console.log(temp);
      var labels = {
        chart: {
          id: "lineplot",
        },
        xaxis: {
          categories: temp,
        },
      };
      return labels;
    } catch (error) {
      console.log(error);
      return [{}];
    }
  }

  return (
    <div className="App">
      <Container align="center">
        <br />
        <Typography variant="h3">Temperature monitor</Typography>
        <br />
        <Chart
          options={getLabelArray(tempArray)}
          series={getTempArray(tempArray)}
          type="line"
          width="800"
        />
        <Typography>
          Average temp:{" "}
          <Typography variant="h4" color="error">
            {!tempArray ? "loading" : getAverageTemp(tempArray)}
          </Typography>
        </Typography>
      </Container>
      <br />
      <br />
      <Container>
        <hr />
        <Typography variant="h5">Last measures: </Typography>
        <TableContainer component={Paper}>
          <Table className="BookmarksTable" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Temperature</TableCell>
                <TableCell>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderTr(tempArray)}</TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default App;
