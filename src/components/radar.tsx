import RadarChart from 'react-svg-radar-chart'
import 'react-svg-radar-chart/build/css/index.css'

//console.log(company.Ticker)
const normalize = (value: number, min: number, max: number) => {
  return Math.min(1, Math.max(0, (value - min) / (max - min)))
}

interface Props {
  company: {
    growthscore: number
    debtqualityscore: number
    earningsscore: number
    profitabilityscore: number
    potential: number
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
              battery: normalize(company.growthscore, 0, 1),
              design: normalize(company.debtqualityscore, 0, 1),
              useful: normalize(company.earningsscore, 0, 1),
              speed: normalize(company.potential, -0.15, 1),
              weight: normalize(company.profitabilityscore, 0, 1),
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
