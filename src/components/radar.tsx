import React from 'react'
import RadarChart from 'react-svg-radar-chart'
import 'react-svg-radar-chart/build/css/index.css'

//console.log(company.Ticker)
const normalize = (value: any, min: any, max: any) => {
  return Math.min(1, Math.max(0, (value - min) / (max - min)))
}
function App(props: {
  company: {
    GrowthScore: any
    DebtQualityScore: any
    EarningsScore: any
    ProfitabilityScore: any
    Potential: any
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
          battery: 'Growth',
          design: 'Debt Quality',
          useful: 'Earnings',
          speed: 'Potential',
          weight: 'Profitability',
        }}
        data={[
          // data
          {
            data: {
              battery: normalize(props.company.GrowthScore, 0, 1),
              design: normalize(props.company.DebtQualityScore, 0, 1),
              useful: normalize(props.company.EarningsScore, 0, 1),
              speed: normalize(props.company.Potential, -0.15, 1),
              weight: normalize(props.company.ProfitabilityScore, 0, 1),
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
