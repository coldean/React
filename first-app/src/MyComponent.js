import PropTypes from 'prop-types';

const MyComponent = ({name, age, num}) =>{
    return <div> hi my name is {name}, {age}, {num}. </div>;
};

MyComponent.defaultProps = {
    name: '기본 이름'
};

MyComponent.propTypes = {
    name : PropTypes.string,
    num : PropTypes.number.isRequired
}


export default MyComponent;