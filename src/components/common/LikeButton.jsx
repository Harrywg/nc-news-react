import { useState } from "react";
import likeImg from "../../assets/like.png";

export default function LikeButton({
  like,
  updateVotes,
  patchTarget,
  targetId,
}) {
  const [isSelected, setIsSelected] = useState(false);
  const [isError, setIsError] = useState(false);

  const modifier = like ? 1 : -1;

  const handleClick = () => {
    if (!isSelected) {
      setIsError(false);
      const amount = 1 * modifier;
      setIsSelected(true);
      updateVotes(amount);
      patchTarget(targetId, amount).catch((err) => {
        setIsError(true);
        setIsSelected(false);
        updateVotes(amount * -1);
      });
    } else {
      const amount = -1 * modifier;
      setIsError(false);
      setIsSelected(false);
      updateVotes(amount);
      patchTarget(targetId, amount).catch((err) => {
        setIsError(true);
        setIsSelected(true);
        updateVotes(amount * -1);
      });
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={
          isSelected ? "interact-button user-selected" : "interact-button"
        }
      >
        <img src={likeImg} className={like ? "icon" : "icon dislike"} />
      </button>
      {isError ? <p className="error-msg">Something went wrong</p> : <></>}
    </>
  );
}
