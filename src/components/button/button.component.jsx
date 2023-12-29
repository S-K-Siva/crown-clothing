import './button.styles.scss';
const BUTTON_TYPE = {
    'google':'google-sign-in',
    'inverted':'inverted'
};
const Button = (props) => {
    const {buttonType, content,type,...otherprops} = props;
    
    return <button className={`button-container ${BUTTON_TYPE[buttonType]}`} type={type} {...otherprops}>{content}</button>;
}

export default Button;