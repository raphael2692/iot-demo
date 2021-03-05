// Hooks
import { useState, useEffect } from "react";
// ApexCharts
import Chart from "react-apexcharts";
// MaterialUI components
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { styled } from "@material-ui/core/styles";

function App() {
  // Hooks per richiedere e aggiornare i valori di temperatura
  // useEffect fetcha i dati e aggiorna l'hook "tempArray"

  const [tempArray, setTempArray] = useState([]);

  useEffect(() => {
    const fetchAllTemp = async () => {
      const response = await fetch("http://0.0.0.0:8000/temperatures/");
      const fetchedTemp = await response.json();
      // console.log(fetchedTemp);
      setTempArray(fetchedTemp);
    };
    const interval = setInterval(fetchAllTemp, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Funzione per popolare le righe della Table "TempTable"
  const renderTr = (array) =>
    array.map((el) => (
      <TableRow key={el.id}>
        <TableCell>{el.temperatura}</TableCell>
        <TableCell>{el.data}</TableCell>
      </TableRow>
    ));

  // Funzione per calcolare la media
  let average = (array) => array.reduce((a, b) => a + b) / array.length;

  // Get per calcolare la media di un array di interi
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
  // Get per i valori del plot (ApexCharts series{})
  function getTempArray(array) {
    var temp = [];
    try {
      array.forEach((el) => temp.push(Number(el.temperatura)));
      // console.log('****');
      // console.log(temp);
      var series = [
        {
          name: "Temperatura",
          data: temp,
        },
      ];
      return series;
    } catch (error) {
      console.log(error);
      return [{}];
    }
  }
  // Get per il label del plot (ApexCharts options{})
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

  function MyChart(props) {
    return (
      <Grid container item lg={6} spacing={3}>
        <Chart
          options={props.options}
          series={props.series}
          type={props.type}
          width="550"
          height="600"
        />
      </Grid>
    );
  }
  // Hook tipo plot
  const [currentGraph, setCurrentGraph] = useState("line");
  // Syles
  const HeaderWrap = styled(Container)({
    background: "#2196f3",
    color: "white",
  });

  return (
    <div className="App">
      <HeaderWrap maxWidth={false} align="center">
        <br />
        <Typography variant="h1">IoT Dashboard Demo</Typography>
        <br />
        <br />
        <br />
      </HeaderWrap>

      <Container maxWidth="lg">
        <br />
        <br />
        <Typography variant="h3">
          Monitor della temperatura{" "}
          {tempArray.length === 0 ? "(caricamento in corso...)" : ""}
        </Typography>
        <br />
        <Typography variant="h4">
          Temperatura media:{" "}
          {tempArray.length === 0 ? "" : getAverageTemp(tempArray)}
        </Typography>
        <br />
        <br />
        <Typography variant="h4">Analytics</Typography>
        <Typography>
          <br />
          STILE DEL GRAFICO:
          <Button onClick={() => setCurrentGraph("line")}>Lineplot</Button>
          <Button onClick={() => setCurrentGraph("bar")}>Histogram</Button>
          <br />
        </Typography>
        <Grid
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
          container
        >
          <MyChart
            options={getLabelArray(tempArray)}
            series={getTempArray(tempArray)}
            type={currentGraph}
          ></MyChart>

          <Grid container item lg={6} spacing={3}>
            <TableContainer component={Paper}>
              <Table className="TempTable" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Temperatura</TableCell>
                    <TableCell>Data</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{renderTr(tempArray)}</TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
