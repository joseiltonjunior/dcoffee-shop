import { styled } from '@/styles/index'

export const ProductContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'stretch',
  gap: '4rem',

  maxWidth: 1180,
  margin: '0 auto',
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 576,
  height: '100%',
  background: 'linear-gradient(180deg, $purple300 0%, $gray300 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  '@media (min-height: 700px)': {
    height: 656,
  },
})

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '$2xl',
    color: '$white',
  },

  span: {
    marginTop: '1rem',
    display: 'block',
    fontSize: '$2xl',
    color: '$purple300',
  },

  p: {
    marginTop: '2.5rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },

  button: {
    marginTop: 'auto',
    background: '$purple300',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',
    height: '3.813rem',
    transition: 'background 0.3s',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    div: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    '&:hover': {
      background: '$purple500',
      border: '1px solid $purple300',
      color: '$white',
    },
  },
})
