import { CompanyDetails } from '@/lib/prisma/company'
import RadarChart from 'react-svg-radar-chart'

import 'react-svg-radar-chart/build/css/index.css'

const normalize = (value: number, min: number, max: number) => {
  return Math.min(1, Math.max(0, (value - min) / (max - min)))
}

interface Props {
  company: CompanyDetails
}

const Radar = ({ company }: Props) => {
  const {
    growthscore,
    debtqualityscore,
    earningsscore,
    potential,
    profitabilityscore,
  } = company

  return (
    <div>
      <RadarChart
        captions={{
          battery: 'Growth',
          design: 'Debt Quality',
          useful: 'Earnings',
          speed: 'Potential',
          weight: 'Profitability',
        }}
        data={[
          {
            data: {
              battery: normalize(growthscore ?? 0, 0, 1),
              design: normalize(debtqualityscore ?? 0, 0, 1),
              useful: normalize(earningsscore ?? 0, 0, 1),
              speed: normalize(potential ?? 0, -0.15, 1),
              weight: normalize(profitabilityscore ?? 0, 0, 1),
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
