import Image from 'next/image'
import parse from 'html-react-parser'
import LinkTo from './LinkTo'
import { useState } from 'react'

type Props = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  credit?: string
  href?: string
}

const ImageWithCredit = (props: Props): JSX.Element => {
  const [showCaption, setShowCaption] = useState(false)
  const { src, alt, credit, className, width, height, href } = props
  const ImageComponent = (): JSX.Element => (
    <Image {...(className ? { className } : {})} width={width} height={height} alt={alt} src={src ?? ''} />
  )
  return (
    <div className="relative">
      {href ? (
        <LinkTo href={href}>
          <ImageComponent />
        </LinkTo>
      ) : (
        <ImageComponent />
      )}
      {credit && credit !== 'null' ? (
        <caption className="prose prose-a:text-white prose-a:underline bg-slate-900 absolute right-0 top-0 text-white text-xs px-3 py-1 w-auto text-center">
          {showCaption ? (
            <>
              {parse(credit)}{' '}
              <button className="underline" onClick={() => setShowCaption(false)}>
                Hide
              </button>
            </>
          ) : (
            <button className="underline" onClick={() => setShowCaption(true)}>
              Show Attribution
            </button>
          )}
        </caption>
      ) : (
        ''
      )}
    </div>
  )
}

export default ImageWithCredit
