import React, { useState, RefObject } from 'react'
import { Box, Stack } from 'grommet'
import { List } from 'immutable'
import { motion } from 'framer-motion'

import Page from 'components/Page'
import Paragraph from 'components/Paragraph'
import Heading from 'components/Heading'
import CriterionIcon from 'components/CriterionIcon'
import Container from 'components/Container'
import ScrollableItem from 'components/ScrollableItem'

import useConfiguration from 'hooks/app/useConfiguration'
import useTheme from 'hooks/generic/useTheme'
import useResponsive from 'hooks/generic/useResponsive'

import { ColorsNames } from 'themes/theme'

import { keys } from 'utils/object'

import { ImmutableCriterion } from 'types/data/criterion'

const Background = motion.custom(Box)

interface CriteriaScreenProps {
  criteria: List<ImmutableCriterion>;
}

const CriteriaScreen: React.FC<CriteriaScreenProps> = ({ criteria }) => {
  const configuration = useConfiguration()
  const { colors, brandColors, oppositeColors } = useTheme()
  const { isMobile } = useResponsive()
  const colorNames = ['gray'].concat(keys(brandColors)) as ColorsNames[]
  const [backgroundColorName, setBackgroundColorName] = useState<ColorsNames>(colorNames[0])
  const refs: { [key: string]: RefObject<HTMLDivElement> } = {}

  return (
    <>
      <Page title="Nuestros criterios">
        <Stack guidingChild="last">
          <Background
            animate={{
              backgroundColor: colors[backgroundColorName] as string
            }}
            transition={{
              duration: 0.7
            }}
            style={{
              position: 'fixed',
              zIndex: -1
            }}
            fill
          />
          <Box>
            <ScrollableItem
              onScrollEnter={() => {
                if (!isMobile) {
                  setBackgroundColorName(colorNames[0 % colorNames.length])
                }
                window.history.pushState(null, document.title, '#')
              }}
            >
              <Container
                height={!isMobile ? '85vh' : undefined}
                pad="medium"
              >
                <Box
                  justify="center"
                  align="center"
                  fill
                >
                  <Box width="large">
                    <Heading
                      transform="uppercase"
                      color={oppositeColors[backgroundColorName]}
                      textAlign="center"
                      margin={{ vertical: '4rem' }}
                    >
                      {configuration.getIn(['criteria-page', 'title'])}
                    </Heading>
                    <Paragraph
                      textAlign="center"
                      color={oppositeColors[backgroundColorName]}
                    >
                      {configuration.getIn(['criteria-page', 'introduction'])}
                    </Paragraph>
                  </Box>
                </Box>
              </Container>
            </ScrollableItem>
            {criteria.map((criterion, index) => (
              <ScrollableItem
                onScrollEnter={() => {
                  if (!isMobile) {
                    setBackgroundColorName(colorNames[(index + 1) % colorNames.length])
                  }
                  window.history.pushState(null, document.title, `#${criterion.get('id')}`)
                }}
                key={criterion.get('id')}
              >
                <Box
                  fill
                  ref={refs[`#${criterion.get('id')}`]}
                  background={!isMobile ? undefined : { color: colorNames[(index + 1) % colorNames.length] }}
                  pad={isMobile ? { vertical: 'large' } : undefined}
                >
                  <Container pad="medium">
                    <Box
                      id={criterion.get('id')}
                      direction={isMobile ? 'column' : 'row'}
                      height={!isMobile ? '90vh' : undefined}
                      align="center"
                      justify="center"
                      fill="horizontal"
                    >
                      <Box
                        width="30%"
                        align="center"
                        justify="center"
                      >
                        <Box
                          key={criterion.get('name')}
                          width="small"
                          height="small"
                          gap="medium"
                        >
                          <CriterionIcon
                            criterion={criterion}
                            color={oppositeColors[backgroundColorName]}
                          />
                          <Heading
                            transform="uppercase"
                            level={2}
                            size="small"
                            textAlign="center"
                            color={oppositeColors[backgroundColorName]}
                          >
                            {criterion.get('name')}
                          </Heading>
                        </Box>
                      </Box>
                      <Box
                        width={!isMobile ? '70%' : undefined}
                        align="center"
                        justify="center"
                        flex={{ grow: 1 }}
                      >
                        <Box width="35rem">
                          <Paragraph
                            size="large"
                            textAlign="center"
                            color={oppositeColors[backgroundColorName]}
                          >
                            {criterion.get('description')}
                          </Paragraph>
                        </Box>
                      </Box>
                    </Box>
                  </Container>
                </Box>
              </ScrollableItem>
            ))}
          </Box>
        </Stack>
      </Page>
    </>
  )
}

export default CriteriaScreen
