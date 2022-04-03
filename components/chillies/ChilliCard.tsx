import { IChilli } from '~/lib/types'
import LinkTo from '../global/LinkTo'

const ChilliCard: React.FunctionComponent<IChilli> = (props) => {
  return (
    <>
      {props.handle}
      {props.scoville[0]} - {props.scoville[1]}
      {props.species[0].name}
      <LinkTo href={`/chillies/${props.handle}`}>{props.name}</LinkTo>
    </>
  )
}
export default ChilliCard
