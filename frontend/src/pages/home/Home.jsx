import { Link } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import {useDispatch , useSelector} from "react-redux"

import "./home.css";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";
const Home = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.post);


    useEffect( () =>{
        dispatch(fetchPosts(1));
    }, [])
    return ( 
        <section className="home">
            <div className="home-hero-header">
                <div className="home-hero-header-layout">
                    <h1 className="home-title">welcome to blog</h1>
                </div>
            </div>
            <div className="home-latset-post">Latset Post</div>
            <div className="home-container">
                <PostList posts={posts}/>
                <Sidebar />
            </div>
            <div className="home-see-posts-link">
                <Link to="/posts" className="home-link">
                     see all posts
                </Link>
            </div>
        </section>
     );
}
 
export default Home;