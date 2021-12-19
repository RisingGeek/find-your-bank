import propTypes from 'prop-types';

const Show = (props) => {
  const { isVisible, children } = props;

  if (!isVisible) {
    return null;
  }

  return children;
};

Show.propTypes = {
  isVisible: propTypes.bool.isRequired,
  children: propTypes.node.isRequired,
};

export default Show;
