import React, { useEffect } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { normalize } from 'normalizr'
import { useDispatch } from 'react-redux'

import Page from '~/components/Page'
import BrandPreview from '~/components/BrandPreview/BrandPreview'
import ResponsiveGrid from '~/components/ResponsiveGrid'
import { ThemeColorsType, BrandColorsKeys } from '~/themes/theme'
import { fetchBrands } from '~/api/brands'
import useSelector from '~/hooks/useSelector'
import * as schemas from '~/store/schemas'
import { selectBrands } from '~/store/entities/brands/selectors'
import { Brand } from '~/store/entities/brands/types'
import { setBrandsColors } from '~/store/interface/actions'
import useTheme from '~/hooks/useTheme'

const Home: NextPage = () => {
  const { theme: { global: { brandColorsNames } } } = useTheme()
  const brands = useSelector(selectBrands) as Brand[]
  const dispatch = useDispatch()

  useEffect(() => {
    if (brands && brands.length) {
      const brandsColors: { [key: string]: BrandColorsKeys } = {}
      brands.forEach((brand, index) => {
        brandsColors[brand.id] = brandColorsNames[index % brandColorsNames.length]
      })
      dispatch(setBrandsColors(brandsColors))
    }
  }, [brands])

  return (
    <>
      <Page title="Home">
        <ResponsiveGrid
          columns={{
            small: ['full'],
            medium: ['50%'],
            xlarge: ['33.33%']
          }}
        >
          {!brands || brands.map((brand, index) => (
            <BrandPreview
              key={brand.id}
              brand={brand}
              color={brandColorsNames[index % brandColorsNames.length] as keyof ThemeColorsType}
            />
          ))}
        </ResponsiveGrid>
      </Page>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchBrands()
  const normalizedData = normalize(data, [schemas.brand])
  return {
    props: {
      entities: [
        normalizedData.entities
      ]
    }
  }
}

export default Home
