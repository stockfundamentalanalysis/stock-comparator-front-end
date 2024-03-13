import RadarChart from 'react-svg-radar-chart'
import 'react-svg-radar-chart/build/css/index.css'

//console.log(company.Ticker)
const normalize = (value: number, min: number, max: number) => {
  return Math.min(1, Math.max(0, (value - min) / (max - min)))
}

interface Props {
  company: {
    GrowthScore: number
    DebtQualityScore: number
    EarningsScore: number
    ProfitabilityScore: number
    Potential: number
  }
}

const Radar = ({ company }: Props) => {
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
              battery: normalize(company.GrowthScore, 0, 1),
              design: normalize(company.DebtQualityScore, 0, 1),
              useful: normalize(company.EarningsScore, 0, 1),
              speed: normalize(company.Potential, -0.15, 1),
              weight: normalize(company.ProfitabilityScore, 0, 1),
            },
            meta: { color: '#58FCEC' },
          },
        ]}
        size={400}
      />
    </div>
  )
}

export default Radar
