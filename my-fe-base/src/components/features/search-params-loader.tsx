//path : my-fe-base/src/components/features/search-params-loader.tsx
'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { type ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'

type SearchParamsLoaderProps = {
  onParamsReceived: (params: ReadonlyURLSearchParams) => void
}

function Suspender(props: SearchParamsLoaderProps) {
  return (
    <Suspense>
      <Suspended {...props} />
    </Suspense>
  )
}

function Suspended({ onParamsReceived }: SearchParamsLoaderProps) {
  const searchParams = useSearchParams()

  useEffect(() => {
    onParamsReceived(searchParams)
  })

  return null
}

//export
const SearchParamsLoader = React.memo(Suspender)
export default SearchParamsLoader

export const useSearchParamsLoader = () => {
  const [searchParams, setSearchParams] = useState<ReadonlyURLSearchParams | null>(null)
  return {
    searchParams,
    setSearchParams,
  }
}
