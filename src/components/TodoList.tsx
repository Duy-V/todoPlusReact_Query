import React, { useState } from "react";
import useTodos from "../hooks/useTodos";
import Pagination from "./Pagination";
import Todo from "./Todo";

const TodoList = () => {
  const [page, setPage] = useState(1);
  const {
    data,
    // error,
    // isLoading,
    // isFetchingNextPage,
    // fetchNextPage,
    // hasNextPage,
  } = useTodos();
  console.log(data?.pages[0].data);
  
  return (
    <div className="flex flex-wrap gap-5">
      <div className="flex flex-column flex-wrap gap-5">
        {data?.pages[0].data.map((todo: any, index: number) => (
          <Todo key={index} data={todo} />
        ))}

        <div className=" justify-end align-bottom btn-group">
          <Pagination
            data={data?.pages[0]?.data}
            RenderComponent={Todo}
            title="TodoList"
            pageLimit={3}
            dataLimit={4}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoList;

// <div key={index} className="flex flex-row flex-wrap gap-5">
//   <div className="flex-row card w-96 bg-base-100 shadow-xl p-2">
//     <div className="right-part w-60 flex-auto ">
//       {/* <figure>
//         <img
//           src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
//           alt="Shoes"
//         />
//       </figure> */}
//       <div className="card-body">
//         <h2 className="card-title">
//           {todo.name}
//           <div className="badge badge-secondary"></div>
//         </h2>
//         <p>{todo.content}</p>
//         {todo?.tags?.map((tag: any, index: number) => (
//           <div key={index} className="card-actions justify-end">
//             <div className="badge badge-outline">{tag?.title}</div>
//           </div>
//         ))}
//       </div>
//     </div>

//     <div className="left-part flex flex-col flex-auto w-32">
//       <div className="flex flex-col">
//         <button className="btn btn-outline btn-primary btn-sm mb-3">
//           View
//         </button>
//         <button className="btn btn-outline btn-secondary btn-sm mb-3">
//           Edit
//         </button>
//         <button className="btn btn-outline btn-accent btn-sm mb-3">
//           Delete
//         </button>
//       </div>
//       <label className="cursor-pointer label">
//         <span className="label-text">Finished</span>
//         <input
//           type="checkbox"
//           checked
//           className="checkbox checkbox-accent"
//         />
//       </label>
//     </div>
//   </div>
// </div>
