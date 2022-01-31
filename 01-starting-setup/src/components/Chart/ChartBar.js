import React from 'react';
import './ChartBar.css';

const ChartBar = (props) => {
  let barFillHeight = '0%';
  if (props.max > 0) {
    barFillHeight = Math.round((props.value / props.max) * 100) + '%';
  }
  return (
    <div className="chart-bar">
      <div class="chart-bar__inner">
        <div class="chart-bar__fill" style={{ height: barFillHeight }}></div>
      </div>
      <div class="chart-bar__label">{props.label}</div>
    </div>
  );
};

export default ChartBar;
