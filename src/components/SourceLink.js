import React from 'react';

const SourceLink = props => {
  /* eslint-disable jsx-a11y/anchor-has-content */
  return (
    <a href='/home' rel="noopener noreferrer" {...props} />
  );
};

export default SourceLink;
