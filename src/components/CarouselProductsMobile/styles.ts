import { styled } from '@/styles'
import Link from 'next/link'

export const Container = styled('div', {
  display: 'flex',
  overflow: 'hidden',
})

export const Card = styled(Link, {
  height: 300,
  width: '100%',
  background: '$gray800',
  borderRadius: 3,

  display: 'grid',
  gridTemplateRows: 'auto 80px',

  textDecoration: 'none',

  '.img': {
    borderBottom: '1px solid $gray900',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '.info': {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',

    strong: {
      color: '$orange500',
    },

    span: {
      color: '$gray300',
      overflow: 'hidden',
      display: '-webkit-box',
      '-webkit-line-clamp': '1',
      '-webkit-box-orient': 'vertical',
    },
  },
})
