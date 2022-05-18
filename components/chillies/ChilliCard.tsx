import Image from 'next/image'
import React from 'react'
import { IChilli } from '~/lib/types'
import LinkTo from '../global/LinkTo'

const ChilliCard: React.FunctionComponent<IChilli> = (props) => {
  const { images, name, scoville, species, origin } = props
  const defaultImage = images[0]
  return (
    <div className="w-1/1 h-1/1  overflow-hidden flex flex-col border-b-4 border-b-black border-x border-x-slate-300 border-t border-t-slate-300 bg-slate-100">
      {defaultImage && (
        <LinkTo tabIndex={-1} className="flex-grow block overflow-hidden " href={`/chillies/${props.handle}`}>
          <Image
            className="hover:scale-105 transition-transform"
            width={600}
            height={600}
            alt={defaultImage.alt}
            src={defaultImage.url ?? ''}
          />
        </LinkTo>
      )}
      <div className="p-4 mt-auto mb-2 ">
        <LinkTo href={`/chillies/${props.handle}`}>
          <h2 className="text-xl font-extrabold uppercase mb-2">{name}</h2>
        </LinkTo>
        <div className="text-slate-600">
          {scoville && (
            <>
              <span className="font-bold uppercase  tracking-wide">Heat: </span>
              <span className="italic">
                {scoville[0]} - {scoville[1]} SHU
              </span>
            </>
          )}
          {species.length > 0 && (
            //Make into component for species list
            <div>
              <span className="font-bold uppercase tracking-wide">Species: </span>
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
              <span className="font-bold uppercase tracking-wide">Origins: </span>
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
    </div>
  )
}
export default ChilliCard
