import Image from 'next/image'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import LinkTo from '../global/LinkTo'

const FullChilliProfile = (props: IChilli): JSX.Element => {
  const { images, name, scoville, species, desc } = props
  const defaultImage = images[0]
  return (
    <>
      <div>
        {defaultImage && <Image width={200} height={200} alt={defaultImage.alt} src={defaultImage.url} />}

        <h2 className="text-lg">{name}</h2>
        <ReactMarkdown>{desc}</ReactMarkdown>
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
    </>
  )
}
export default FullChilliProfile
