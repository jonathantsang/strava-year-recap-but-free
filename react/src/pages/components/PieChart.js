import {
  Chart,
  PieSeries,
  Legend
} from '@devexpress/dx-react-chart-material-ui';

export function PieChart(props) {
    // Sample data
    const data = [
      { argument:'Monday', value:10 },
      { argument:'Tuesday', value:40 },
      { argument:'Wednesday', value:10 },
      { argument:'Thursday', value:20 },
      { argument:'Friday', value:20 },
    ];
    return (
        <Chart data={props.data !== undefined ? props.data : data}>
          <PieSeries valueField="value" 
            argumentField="argument" 
            innerRadius={0.6} />
          <Legend position="bottom"/>
        </Chart>
    );
}
  
export default PieChart;
