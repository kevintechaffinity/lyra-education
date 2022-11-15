import React from 'react';
import * as Icons from 'react-icons/fa';

export default function Icon({ name }) {
  const TagName = Icons[name];

  return (
    <i className="icon">
      <TagName />
    </i>
  );
}
