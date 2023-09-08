import { useState, useEffect } from "react";
import likeImg from "../../assets/like.png";

export default function LikeButton({
  like,
  likeState,
  setLikeState,
  updateVotes,
  patchTarget,
  targetId,
}) {
  const [isError, setIsError] = useState(false);

  const type = like ? "like" : "dislike";
  const otherType = like ? "dislike" : "like";

  useEffect(() => {
    console.log(likeState);
  }, [likeState]);

  const handleChange = (type, isClickedModifier) => {
    setIsError(false);
    const likeDislikeModifier = type === "like" ? 1 : -1;
    const amount = 1 * likeDislikeModifier * isClickedModifier;
    setLikeState({ ...likeState, [type]: !likeState[type] });
    updateVotes(amount);
    patchTarget(targetId, amount).catch((err) => {
      setLikeState({ ...likeState, [type]: !likeState[type] });
      setIsError(true);
      updateVotes(amount * -1);
    });
  };

  const handleChangeBoth = (type, otherType) => {
    setIsError(false);
    const amount = type === "like" ? 2 : -2;
    setLikeState({ [type]: true, [otherType]: false });
    updateVotes(amount);
    patchTarget(targetId, amount).catch((err) => {
      setLikeState({ [type]: false, [otherType]: true });
      setIsError(true);
      updateVotes(amount * -1);
    });
  };

  return (
    <>
      <button
        onClick={() => {
          const isClickedModifier = likeState[type] ? -1 : 1;
          if (likeState[otherType]) {
            handleChangeBoth(type, otherType);
          } else handleChange(type, isClickedModifier);
        }}
        className={
          likeState[type] ? "interact-button user-selected" : "interact-button"
        }
      >
        <img src={likeImg} className={like ? "icon" : "icon dislike"} />
      </button>
      {isError ? <p className="error-msg">Something went wrong</p> : <></>}
    </>
  );
}
