import { CDN_IMAGE_URL } from "../Utils/constant.js";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Shimmer from "./Shimmer.js";
const MenuRestarent=(props)=>{
    const {title,arrow,setArryFunctions}=props;
    const {itemCards}=props?.data?.card?.card;
    const [presntData,setPresntData]=useState(itemCards?.slice(0,5));
    const [currentIndex,setCurrentIndex]=useState(5);
    const [hasmore,setHasMore]=useState(true);
  const fetchdata=()=>{
    if(presntData.length>=itemCards.length){
        setHasMore(false);
        return
    }
    setTimeout(()=>{
           if(presntData.length>0){
              setPresntData(presntData.concat(itemCards.slice(currentIndex,currentIndex+4)));
              setCurrentIndex(currentIndex+4);
           }
           else{
            setPresntData([]);
           }
    },1500)
  }
    return(
        <>
           { itemCards && 
           <div className="" >
                  <h3 className="font-bold">{title}({props?.data?.card?.card?.itemCards?.length})</h3>
                    {
                      <span onClick={setArryFunctions} className="material-symbols-outlined arrow">
                                    arrow_circle_down
                                   </span>
                      }
           </div>
           }         
           {arrow && 
           <InfiniteScroll hasMore={hasmore}dataLength={presntData.length} next={fetchdata}
           loader={<p>plesse wiat load tha food</p>}
           endMessage={<p>end of data</p>}
           >
              {itemCards && presntData.map((data,index)=>{
               return(
                     <>
                  <div key={index}className="retarentName INNERMENU">
                       <div>
                         <h4>{data.card.info.name}</h4>
                         <p>₹{data.card.info.price}</p>
                      </div>
                    <div>
                          <img loading="lazy" alt={"loading"}className="w-40 h-28 rounded-3xl " src={CDN_IMAGE_URL+data.card.info.imageId}></img>
                    </div>
                 </div>
                      <hr style={{width: "600px",borderBottom: "1px dashed #d3d3d3"}}/> 
                </>
            )
        }
    )
}
           </InfiniteScroll>}
        </>
     )
}
export default MenuRestarent;