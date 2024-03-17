const HeaderLeft = ({toggle , setToggle}) => {
    return (  
        <div className="header-left">
              <div className="header-logo">
                <strong>blog</strong>
        <i className="bi bi-pencil"></i>
        </div>
        <div onClick={() => setToggle(prev => !prev)} className="header-meuo">
            {toggle ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i> }
        </div>
    </div>
    );
}
 
export default HeaderLeft;