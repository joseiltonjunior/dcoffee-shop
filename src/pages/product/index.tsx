import { stripe } from '@/lib/stripe'
import { ProductProps } from '@/types/product'
import { GetServerSideProps } from 'next'

import Stripe from 'stripe'

import { Container, ContentMobile, ContentWeb } from '@/styles/pages/product'
import { ProductWeb } from '@/components/ProductWeb'
import { SkeletonProductWeb } from '@/components/ProductWeb/Skeleton'
import { ProductMobile } from '@/components/ProductMobile'
import { SkeletonProductMobile } from '@/components/ProductMobile/Skeleton'
import axios from 'axios'
import { useState } from 'react'

import { useToast } from '@/hooks/useToast'
import Head from 'next/head'
import { Breadcrumb } from '@/components/Bradcrum'

export default function Product({ product }: ProductProps) {
  const [isLoading, setIsLoading] = useState(false)

  const { showToast } = useToast()

  async function handleBuyProduct() {
    setIsLoading(true)

    await axios
      .post('/api/checkout', { priceId: product.defaultPriceId })
      .then((result) => {
        const { checkoutUrl } = result.data
        window.location.href = checkoutUrl
      })
      .catch(() => {
        showToast('Falha ao redirecionar ao checkout', {
          type: 'error',
          theme: 'colored',
        })
      })
      .finally(() => setIsLoading(false))
  }

  if (!product) {
    return (
      <Container>
        <ContentWeb>
          <SkeletonProductWeb />
        </ContentWeb>

        <ContentMobile>
          <SkeletonProductMobile />
        </ContentMobile>
      </Container>
    )
  }

  return (
    <>
      <Head>
        <meta name="image" content={product.imageUrl} />
        <title>{`${product.name}  | Ignite Shop`}</title>
      </Head>

      <Breadcrumb nameShirt={product.name} />

      <Container>
        <ContentWeb>
          <ProductWeb
            product={product}
            purchase={handleBuyProduct}
            isLoading={isLoading}
          />
        </ContentWeb>

        <ContentMobile>
          <ProductMobile
            product={product}
            purchase={handleBuyProduct}
            isLoading={isLoading}
          />
        </ContentMobile>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const productId = String(query.id)

  let product = {} || null

  await stripe.products
    .retrieve(productId, {
      expand: ['default_price'],
    })
    .then((result) => {
      const price = result.default_price as Stripe.Price

      product = {
        id: result.id,
        name: result.name,
        imageUrl: result.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: result.description,
        defaultPriceId: price.id,
      }
    })
    .catch(() => {
      product = null
    })

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      product,
    },
  }
}