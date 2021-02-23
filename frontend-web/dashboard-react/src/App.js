import { useState, useEffect } from "react";

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
    array.reverse().map((el) => (
      <TableRow key={el.id}>
        <TableCell>{el.temperatura}</TableCell>
        <TableCell>{el.data}</TableCell>
      </TableRow>
    ));

  let average = (array) => array.reduce((a, b) => a + b) / array.length;
  function getAverageTemp(array) {
    var temp = [];

    array.forEach((el) => temp.push(Number(el.temperatura)));

    console.log(temp);
    try {
      return average(temp);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  return (
    <div className="App">
      <Container align="center">
        <br />
        <Typography variant="h3">
          Monitor della temperatura
        </Typography>
        <br />
        <Typography>
          Temperatura media delle ultime 10 misurazioni:{" "}
          <Typography variant="h4" color="error">
            {!tempArray ? "loading" : getAverageTemp(tempArray)}
          </Typography>
        </Typography>
      </Container>
      <br />
      <br />

      <Container>
        <hr />
        <Typography variant="h5">Ultimi rilevamenti: </Typography>
        <TableContainer component={Paper}>
          <Table className="BookmarksTable" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Temperatura</TableCell>
                <TableCell>Data</TableCell>
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
