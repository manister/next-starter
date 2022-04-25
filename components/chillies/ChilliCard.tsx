import Image from 'next/image'
import React from 'react'
import { IChilli } from '~/lib/types'
import LinkTo from '../global/LinkTo'

const ChilliCard: React.FunctionComponent<IChilli> = (props) => {
  const { images, name, scoville, species } = props
  const defaultImage = images[0]
  return (
    <div className="w-1/1">
      {defaultImage && (
        <LinkTo href={`/chillies/${props.handle}`}>
          <Image width={200} height={200} alt={defaultImage.alt} src={defaultImage.url} />
        </LinkTo>
      )}
      <LinkTo href={`/chillies/${props.handle}`}>
        <h2 className="text-lg">{name}</h2>
      </LinkTo>

      {scoville && (
        <>
          {scoville[0]} - {scoville[1]}
        </>
      )}
      {species.length > 0 && (
        //Make into component for species list
        <>
          {species.map((item, index) => (
            <React.Fragment key={item.handle}>
              <LinkTo href={`/chillies/species/${item.handle}`}>{item.name}</LinkTo>
              {index + 1 === species.length ? '' : ','}
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  )
}
export default ChilliCard
