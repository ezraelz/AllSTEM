import { lazy } from 'react';
const PostCard = lazy(()=> import( '../../components/postCard'));
import './home.css';
const HomeAddPost = lazy(()=> import('./homeAddPost'));
import HomeHeader from './homeHeader';
import HomeLeft from './homeLeft';
import HomeLeftTop from './homeLeftTop';

const Home = () => {

  return (
    <div className='home-feed'>
      <div className="sections">
        <div className="section-left">
          <div className="section-left-top">
          </div>
          <div className="section-left-bottom">
            <HomeAddPost />
          </div>
        </div>
        <div className="section-middle">
          <HomeHeader />
          <PostCard/>
        </div>
        <div className="section-right">
          <HomeLeftTop/>
          <HomeLeft />
        </div>
      </div>
    </div>
  )
}

export default Home
