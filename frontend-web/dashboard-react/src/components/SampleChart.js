import Chart from "react-apexcharts";

function SampleChart(params) {
  var options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };

  var series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="bar" width="500" />
    </div>
  );
}
