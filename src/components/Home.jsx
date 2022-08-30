import React from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import Loader from "react-loader-spinner";

const Home = ({user}) => {
  const renderContent = () => {
    if(user && Object.keys(user).length === 0) {
      return (
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={100}
          width={100}
        />
      )
    }
    switch(user) {
      case false:
        return (
          <>
            <a href={`${process.env.REACT_APP_HOSTNAME}/auth/google`} className='btn-orange btn-large' data-test="button-login">Se connecter avec Google</a>
          </>
        )
      default:
        return (
            <div data-test="button-profile">
              <Link className='btn-orange btn-large' to={`/profile/${user._id}`}>Mon profil</Link>
            </div>
        )
    }
  }

  return (
    <div className='text-center'>
      <div className="text-font-logo">LOOSAMAX</div>
      <h3 className="text-comment">Viens perdre des sous entre amis</h3>
      {renderContent()}
    </div>
  )
}

const mapStateToProps = ({user}) => {
  return {
    user
  }
}

export default connect(mapStateToProps)(Home)
