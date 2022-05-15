import Image from 'next/image'
import React from 'react'
import { IChilli } from '~/lib/types'
import LinkTo from '../global/LinkTo'

const ChilliCard: React.FunctionComponent<IChilli> = (props) => {
  const { images, name, scoville, species, origin } = props
  const defaultImage = images[0]
  return (
    <div className="w-1/1 h-1/1 bg-slate-200 rounded-md overflow-hidden flex flex-col">
      {defaultImage && (
        <LinkTo tabIndex={-1} className="flex-grow overflow-hidden" href={`/chillies/${props.handle}`}>
          <Image
            className="hover:scale-110 transition-transform"
            width={600}
            height={600}
            alt={defaultImage.alt}
            src={defaultImage.url ?? ''}
          />
        </LinkTo>
      )}
      <div className="p-2 mt-auto">
        <LinkTo href={`/chillies/${props.handle}`}>
          <h2 className="text-lg uppercase">{name}</h2>
        </LinkTo>

        {scoville && (
          <>
            Heat: {scoville[0]} - {scoville[1]} SHU
          </>
        )}
        {species.length > 0 && (
          //Make into component for species list
          <div>
            <>Species: </>
            {species.map((item, index) => (
              <React.Fragment key={item.handle}>
                <LinkTo className="underline" href={`/chillies/species/${item.handle}`}>
                  {item.name}
                </LinkTo>
                {index + 1 === species.length ? '' : ','}
              </React.Fragment>
            ))}
          </div>
        )}

        {origin.length > 0 && (
          //Make into component for species list
          <div>
            <>Origins: </>
            {origin.map((item, index) => (
              <React.Fragment key={item.handle}>
                <LinkTo className="underline" href={`/chillies/origin/${item.handle}`}>
                  {item.name}
                </LinkTo>
                {index + 1 === species.length ? '' : ','}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default ChilliCard
