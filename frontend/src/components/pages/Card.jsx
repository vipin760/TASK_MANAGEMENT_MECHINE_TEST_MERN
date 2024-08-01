import React from "react";

const Card = ({ data, handleDelete, editTask }) => {
  return (
    <div className="flex items-center justify-center">
      <ul className="max-w-sm">
        {
            data&&data.length>=1?(
               <>
                {data.map((items, idx) => (
                    <li key={idx} className="flex justify-between">
                      <p>{items.title}</p>{" "}
                      <span className="w-24 flex gap-1">
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => handleDelete(items._id)}
                        ></i>
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() => editTask(items)}
                        ></i>
                      </span>{" "}
                    </li>
                  ))}
               </>
            ):(
                <><p className="text-center">No Data Found</p></>
            )
        }
      </ul>
    </div>
  );
};

export default Card;
