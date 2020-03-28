import React from 'react'
import styled from 'styled-components'
import {
  Box,
  BoxProps,
  Image
} from 'grommet'
import { ImmutableBrand } from '~/store/entities/brands/types'
import { ThemeColorsType } from '~/themes/theme'

const Logo = require('~/assets/images/logo-unicolor.svg').ReactComponent

type BrandImageType = {
  brand: ImmutableBrand;
  color?: keyof ThemeColorsType;
}

const PlaceholderBox = styled(Box)`
  opacity: 1;
`

const BrandImage: React.FC<BoxProps & BrandImageType> = ({ brand, ...props }) => (
  <Box
    background={{ color: 'gray' }}
    {...props}
  >
    {brand.get('pictures')?.size
      ? (
        <Image
          fit="cover"
          src={brand.getIn(['pictures', '0', 'url'])}
        />
      )
      : (
        <PlaceholderBox
          align="center"
          justify="center"
          fill
        >
          <Box width="xsmall" height="xsmall">
            {/* Criterion icon */}
            {brand.getIn(['criteria', '0', 'icon']) && (
              <Image
                height="100%"
                src={brand.getIn(['criteria', '0', 'icon', 'url'])}
                alt={brand.get('name')}
              />
            )}

            {/* Gueiv logo icon */}
            {!brand.getIn(['criteria', '0', 'icon']) && (
              <Logo height="100%" fill="black" />
            )}
          </Box>
        </PlaceholderBox>
      )}
  </Box>
)

export default BrandImage
