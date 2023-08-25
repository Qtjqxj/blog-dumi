import {React} from 'react';

const demo1 = () => {
  return (
    <div style={{
      height: '150px',
      overflowY: 'auto',
      scrollSnapType: 'y mandatory',
    }}>
      <div style={{
        height: '150px',
        background: 'grey',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}>The First One</div>
      <div style={{
        height: '150px',
        background: 'white',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}>The Second One</div>
      <div style={{
        height: '150px',
        background: 'wheat',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}>The Third One</div>
    </div>
  );
};

export default demo1;