import React from 'react'
import { Section } from './style';
import theme from '../../styles/theme';
import { RingLoader } from 'react-spinners';

const Loading = ({ contained, ...props }) => {
  return (
    <>
      {!contained && <RingLoader
        color={theme.palette.primary.main}
        size={60}
        sizeUnit={'px'}
      />
      }

      {contained &&
        <Section {...props}>
          <div>
            <RingLoader
              color={theme.palette.primary.main}
              size={120}
              sizeUnit={'px'}
            />
          </div>
        </Section>
      }
    </>
  )
}

Loading.defaultProps = {
  w: '100wh',
  h: '100vh',
  bgColor: '#e8e8e8',
  contained: true
}

export default Loading;