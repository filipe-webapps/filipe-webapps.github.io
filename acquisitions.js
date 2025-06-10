// Dados de exemplo
const data = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];

// Configuração do ApexCharts
const options = {
  chart: {
    type: 'bar',
    height: 350
  },
  series: [{
    name: 'Acquisitions by year',
    data: data.map(row => row.count)
  }],
  xaxis: {
    categories: data.map(row => row.year)
  }
};

// Renderização do gráfico
const chart = new ApexCharts(document.querySelector("#acquisitions"), options);
chart.render();