import Image from 'next/image'
import { IChilli } from '~/lib/types'
import LinkTo from '../global/LinkTo'

const ChilliCard: React.FunctionComponent<IChilli> = (props) => {
  return (
    <div className="w-1/1">
      <LinkTo href={`/chillies/${props.handle}`}>
        {props.images[0] && <Image width={200} height={200} alt={props.images[0].alt} src={props.images[0].url} />}
      </LinkTo>
      <h2 className="text-lg">{props.name}</h2>
      {props.scoville[0]} - {props.scoville[1]}
      {props.species[0].name}
      <LinkTo href={`/chillies/${props.handle}`}>{props.name}</LinkTo>
    </div>
  )
}
export default ChilliCard
