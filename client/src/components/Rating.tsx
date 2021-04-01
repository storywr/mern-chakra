import React from 'react'
import { StarIcon } from '@chakra-ui/icons'
import styled from '@emotion/styled'

interface Props {
  value: number
}

const StyledStar = styled(StarIcon)`
  color: gold;
  display: ${p => p.value >= p.i ? 'inherit' : 'none'};
`

const Rating = ({ value }: Props) => {
  return (
    <>
      <StyledStar i={1} value={value} />
      <StyledStar i={2} value={value} ml={1} />
      <StyledStar i={3} value={value} ml={1} />
      <StyledStar i={4} value={value} ml={1} />
      <StyledStar i={5} value={value} ml={1} />
    </>
  )
}

export default Rating
