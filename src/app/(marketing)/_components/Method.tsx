import ContentArea from '@/components/ContentArea'
import Heading from '@/components/Heading'
import imgFundamentals from '@/images/fundamentals.png'
import imgPotential from '@/images/potential.png'
import Image from 'next/image'

const Method = () => {
  return (
    <ContentArea>
      <Heading as="h2" color="black" className="text-center">
        The Method
      </Heading>
      <div className="my-12 grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <Heading as="h3" color="black" size="small" className="text-center">
            What is taken into account for the analysis?
          </Heading>
          <Image src={imgFundamentals} alt="Description" />
        </div>
        <div>
          <Heading as="h3" color="black" size="small" className="text-center">
            How is the stock Potential calculated?
          </Heading>
          <Image src={imgPotential} alt="Description" />
        </div>
      </div>
    </ContentArea>
  )
}

export default Method
