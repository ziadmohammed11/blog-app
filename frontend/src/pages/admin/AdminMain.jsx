import { Link } from "react-router-dom";
import AddCategoryForm from "./AddCategoryForm";
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { fetchAllComments } from "../../redux/apiCalls/commentApiCall";
/*import {getPostsCount} from "../../redux/apiCalls/postApiCall" */
/*import { getUsersCount } from "../../redux/apiCalls/profileApiCall"; */


const AdminMain = () => {
  const dispatch = useDispatch();
  const {categories}= useSelector(state => state.category);
  const {comments}= useSelector(state => state.comment);
  /*const {postsCount}= useSelector(state => state.post); */
 /* const {usersCount}= useSelector(state => state.profile) */


  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchAllComments())
    /*dispatch(getPostsCount()) */
   /* dispatch(getUsersCount()) */
  })
    return ( 
        <div className="admin-main">
      <div className="admin-main-header">
        <div className="admin-main-card">
          <h5 className="admin-card-title">Users</h5>
          <div className="admin-card-count">120</div>
          <div className="admin-card-link-wrapper">
            <Link to="/admin-dashboard/users-table" className="admin-card-link">
              See all users
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-person"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Posts</h5>
          <div className="admin-card-count">210</div>
          <div className="admin-card-link-wrapper">
            <Link to="/admin-dashboard/posts-table" className="admin-card-link">
              See all posts
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-file-post"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Categories</h5>
          <div className="admin-card-count">
            {categories.length}
          </div>
          <div className="admin-card-link-wrapper">
            <Link
              to="/admin-dashboard/categories-table"
              className="admin-card-link"
            >
              See all categories
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-tag-fill"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Comments</h5>
          <div className="admin-card-count">
            {comments.length}
          </div>
          <div className="admin-card-link-wrapper">
            <Link
              to="/admin-dashboard/comments-table"
              className="admin-card-link"
            >
              See all comments
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-chat-left-text"></i>
            </div>
          </div>
        </div>
      </div>
      <AddCategoryForm/>
    </div>
  );
};

    
export default AdminMain;