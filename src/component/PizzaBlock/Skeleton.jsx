import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={1}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#eceaea"
    foregroundColor="#ffffff">
    <circle cx="135" cy="130" r="130" />
    <rect x="0" y="272" rx="15" ry="15" width="280" height="27" />
    <rect x="0" y="319" rx="20" ry="20" width="280" height="35" />
    <rect x="0" y="365" rx="20" ry="20" width="280" height="35" />
    <rect x="0" y="428" rx="15" ry="15" width="99" height="27" />
    <rect x="123" y="421" rx="30" ry="30" width="156" height="45" />
  </ContentLoader>
);

export default Skeleton;
