import React, { useRef, useEffect } from 'react';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, LineController, LineElement, PointElement, Title } from 'chart.js';
Chart.register(BarController, BarElement, CategoryScale, LinearScale, LineController, LineElement, PointElement, Title);

function Stat() {
  const chartRef = useRef(null);
  const ageChartRef = useRef(null);

  useEffect(() => {
    const chartNode = chartRef.current;
    const chart = new Chart(chartNode, {
      type: 'bar',
      data: {
        labels: ['Propriété intelectuelle', 'Affaire', 'Famille', 'Sociale', 'Pénal', 'Administratif', 'Immobilier'],
        datasets: [
          {
            
            data: [5, 5, 10, 15, 40, 10, 20],
            backgroundColor: 'rgba(54, 162, 235, 50)',
            borderColor: 'rgba(54, 162, 235, 50)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function (value) {
                return value + '%';
              },
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Les domaines des affaires traité par nous',
            position: 'bottom',
            font: {
              size: 18, 
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y.toFixed(2) + '%';
                }
                return label;
              },
            },
          },
        },
      },
    });

    const ageChartNode = ageChartRef.current;
    const ageChart = new Chart(ageChartNode, {
      type: 'line',
      data: {
        labels: ['25-30', '30-35', '35-40', '40-45', '+50'],
        datasets: [
          {
           
            data: [10, 20, 40, 15, 15],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function (value) {
                return value + '%';
              },
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'L`Age de nos Avocats',
            position: 'bottom',
            font: {
              size: 18, 
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y.toFixed(2) + '%';
                }
                return label;
              },
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
     
      ageChart.destroy();
    };
  }, []);

  return (
    <div>
      <div style={{ width: '50%', height: '400px', display: 'inline-block' }}>
        <canvas ref={chartRef}></canvas>
      </div>
      <div style={{ width: '50%', height: '400px', display: 'inline-block' }}>
        <canvas ref={ageChartRef}></canvas>
      </div>
    </div>
  );}
    
export default Stat;


