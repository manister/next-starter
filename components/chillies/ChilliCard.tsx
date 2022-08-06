import React from 'react'
import ImageWithCredit from '../global/ImageWithCredit'
import LinkTo from '../global/LinkTo'
import Emoji from '../global/Emoji'

// import { useGlobalState } from '~/state/context'

const ChilliCard = (props: IChilli): JSX.Element => {
  const { images, name, scoville, species, origin, handle } = props
  const defaultImage = images[0]
  const url = defaultImage?.url ?? '/images/chilli-placeholder.jpg'
  const alt = defaultImage?.url ?? 'No image available'

  // const { state, actions } = useGlobalState()
  // const { wishlist } = state

  return (
    <div className="w-1/1 h-1/1  overflow-hidden flex flex-col border-b-4 border-b-black border-x border-x-slate-300 border-t border-t-slate-300 bg-slate-100">
      <ImageWithCredit
        href={`/chillies/${handle}`}
        credit={defaultImage?.attr}
        className="hover:scale-105 transition-transform"
        width={600}
        height={600}
        alt={alt}
        src={url}
      />

      <div className="p-4 mt-auto mb-2 ">
        <LinkTo href={`/chillies/${handle}`}>
          <h2 className="text-xl font-extrabold uppercase mb-2 font-display">{name}</h2>
        </LinkTo>

        {/* {wishlist.has(handle) ? (
          <button onClick={() => actions.removeFromWishlist(handle)}>remove</button>
        ) : (
          <button onClick={() => actions.addToWishlist(handle)}>add</button>
        )} */}

        <div className="text-slate-600">
          {scoville && (
            <>
              <span className="font-bold tracking-wide">
                <Emoji src="🔥" /> Heat:{' '}
              </span>
              <span className="italic">
                {scoville[0]} - {scoville[1]} SHU
              </span>
            </>
          )}
          {species.length > 0 && (
            //Make into component for species list
            <div>
              <span className="font-bold tracking-wide">
                <Emoji src="🍃" /> Species:{' '}
              </span>
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
              <span className="font-bold tracking-wide">
                <Emoji src="🌐" /> Origins:{' '}
              </span>
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
