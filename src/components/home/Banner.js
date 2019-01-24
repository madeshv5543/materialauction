import React from 'react';
const backgroundImage = require('../../../assets/images/decentralized-network.jpg')

const Banner = ({appName, token}) => {
  if(token)
    return null;
  return (
    <section
      className="jumbotron text-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        opacity: '1.0',
      }}
    >
      <div className="container">
        <h1 className="jumbotron-heading"> Auctions</h1>
        <p className="lead text-muted">Auction Platform</p>
        <p className="lead text-muted">
          {/* Block Number - {this.state.blockNumber} */}
        </p>
      </div>
    </section>
  )
};

export default Banner;