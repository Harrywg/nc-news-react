import { useState } from "react";
import likeImg from "../../assets/like.png";

export default function LikeButton({
  like,
  updateVotes,
  patchTarget,
  targetId,
}) {
  const [selected, setSelected] = useState(false);

  const modifier = like ? 1 : -1;

  return (
    <button
      onClick={() => {
        if (!selected) {
          const amount = 1 * modifier;
          setSelected(true);
          updateVotes(amount);
          patchTarget(targetId, amount).catch((err) => {
            setSelected(false);
            updateVotes(amount * -1);
          });
        } else {
          const amount = -1 * modifier;
          setSelected(false);
          updateVotes(amount);
          patchTarget(targetId, amount).catch((err) => {
            setSelected(true);
            updateVotes(amount * -1);
          });
        }
      }}
      className={selected ? "interact-button user-selected" : "interact-button"}
    >
      <img src={likeImg} className={like ? "icon" : "icon dislike"} />
    </button>
  );
}
