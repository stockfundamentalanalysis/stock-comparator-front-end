import growthStack from '@/components/images/growth_stack.jpg'
import prof from '@/images/prof.jpeg'
import Timeline from '@mui/lab/Timeline'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

const TimeLineComponent = () => {
  const timelineElements = [
    {
      image: prof,
      title: 'Mission',
      description:
        'Wholesale of marble crushed stones and boulders. Stones are offered with the required grain size and finishing.',
    },
    {
      image: growthStack,
      title: 'Values',
      description:
        'At a time of artificial minerals and resins, we are committed with natural marble. We trust that natural marble brightness and beauty is irreproducible. Our stones are 100% natural and do not represent any risk for peoples’ health.',
    },
    {
      image: growthStack,
      title: 'Foundation',
      description:
        'Familiar company founded in 1983, many generations have been working on offering you the best quality stones.',
    },
    {
      image: growthStack,
      title: 'Resources',
      description:
        'The materials are directly obtained from open-cast quarries that have been exploited for many years by our company.',
    },
    {
      image: growthStack,
      title: 'Facilities',
      description:
        'Based in Almeria, Spain, the company count with a large-surface plant of more than 65 000 m² where our team works for offering you our products with the best quality, delay and lowest cost.',
    },
  ]

  return (
    <Timeline position="alternate">
      {timelineElements.map((element, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot color="secondary" sx={{ p: 0 }}>
              <Image
                src={element.image}
                alt={element.title}
                width={50}
                height={50}
                style={{ borderRadius: '50%' }}
              />
            </TimelineDot>
            {index < timelineElements.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" component="h1">
                {element.title}
              </Typography>
              <Typography>{element.description}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}

export default TimeLineComponent
