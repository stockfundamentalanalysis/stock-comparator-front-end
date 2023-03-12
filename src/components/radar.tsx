import React from 'react'
import RadarChart from 'react-svg-radar-chart'
import 'react-svg-radar-chart/build/css/index.css'
import json from '../data/sfa_easy.json'

//console.log(company.Ticker)

function App(props: {
  company: {
    GrowthScore: any
    DebtQualityScore: any
    EarningsScore: any
    ProfitabilityScore: any
  }
}) {
  /*   const data = Object.values(json)
  const company = data.filter((item) => item.Ticker === 'AAPL')[0]
  console.log(props.data) */
  return (
    <div>
      <RadarChart
        captions={{
          // columns
          battery: 'Potential',
          design: 'Debt Quality',
          useful: 'Earnings',
          speed: 'Profitability',
          weight: 'Growth',
        }}
        data={[
          // data
          {
            data: {
              battery: props.company.GrowthScore,
              design: props.company.DebtQualityScore,
              useful: props.company.EarningsScore,
              speed: props.company.ProfitabilityScore,
              weight: props.company.ProfitabilityScore,
            },
            meta: { color: '#58FCEC' },
          },
        ]}
        size={400}
      />
    </div>
  )
}

export default App
