type Props = {
  className?: string
}

const Container: React.FunctionComponent<Props> = ({ children, className }) => <div className={`px-2 mx-auto ${className}`}>{children}</div>

export default Container
