import PostCard from '../../components/postCard';
import './home.css';
import HomeHeader from './homeHeader';
import HomeLeft from './homeLeft';

const Home = () => {

  return (
    <div className='home-feed'>
      <div className="sections">
        <div className="section-left">
          <div className="section-left-top">p</div>
          <div className="section-left-bottom">b</div>
        </div>
        <div className="section-middle">
          <HomeHeader />
          <PostCard/>
        </div>
        <div className="section-right">
          <HomeLeft />
        </div>
      </div>
    </div>
  )
}

export default Home
