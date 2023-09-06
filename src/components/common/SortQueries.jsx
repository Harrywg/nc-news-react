import { useState } from "react";

export default function SortQueries({ queryData, setQueryData }) {
  const handleChange = (e) => {
    console.log(e);
    setQueryData({ ...queryData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => e.preventDefault} className="sort-queries">
      <p>Sort</p>
      <select onChange={handleChange} name={"sort_by"}>
        <option value={"created_at"}>Date Posted</option>
        <option value={"comment_count"}>Comments</option>
        <option value={"votes"}>Likes</option>
      </select>
      <select onChange={handleChange} name={"order"}>
        <option value={"DESC"}>Descending</option>
        <option value={"ASC"}>Ascending</option>
      </select>
    </form>
  );
}
