import { styled } from '..'

export const Container = styled('div', {
  width: '100%',

  padding: '0 1rem 1rem',

  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',

  margin: '0 auto 4rem',

  h3: {
    fontSize: '$xl',
    margin: '1rem 0',
  },
})
