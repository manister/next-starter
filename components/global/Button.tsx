interface IButtonVariant {
  primary: string
  secondary: string
}

interface Props {
  variant: keyof IButtonVariant
  children: React.ReactElement
}

const baseButtonStyles = 'px-4 py-2 inline-block uppercase transition-colors bold tracking-wide'

const buttonVariants = {
  primary: 'bg-lime-800 text-white hover:text-lime-800 hover:bg-white border-2 border-lime-800',
  secondary: 'bg-white text-lime-800 hover:text-white hover:bg-lime-800 border-2 border-lime-800',
}

const Button = (props: Props): JSX.Element => {
  const { variant, children } = props
  const { className, ...childProps } = children.props
  return (
    <children.type {...childProps} className={`${baseButtonStyles} ${buttonVariants[variant]} ${className ?? ''}`}>
      {children.props.children}
    </children.type>
  )
}

export default Button
