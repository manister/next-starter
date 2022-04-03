import HTMLReactParser from 'html-react-parser'
import { IChilli } from '~/lib/types'

const FullChilliProfile: React.FunctionComponent<IChilli> = (props) => {
  return (
    <>
      <h1>{props.handle}</h1>
      {HTMLReactParser(props.desc)}
      {props.scoville[0]} - {props.scoville[1]}
      {props.species[0].name}
    </>
  )
}
export default FullChilliProfile
