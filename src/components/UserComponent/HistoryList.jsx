import React from 'react'
import { useNavigate } from 'react-router-dom';

function formatDateAndTime(isoString) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
  const year = String(date.getFullYear()).slice(-2); // last two digits of year

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} | ${hours}:${minutes}:${seconds}`;
}

function formatTopic(str) {
  return str.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
}

function HistoryList  ({ list }) {

  if(!list)
    return (<div className='text-lg text-center py-5'>*No quiz attempted yet get started on homepage</div>)

  const navigate=useNavigate();
  console.log(list)
  const handleRowClick = (data) => {
    // console.log("row click:", data)
    const topic=data.topic
    const questions=data.quiz_details
    const correctAnswerNumber=data.score
    const wrongAnswerNumber=data.wrong

    navigate("/review", {
      state: { topic, questions, correctAnswerNumber, wrongAnswerNumber },
    });
  };

  return (
    <div className="p-5">
    <div className="flex gap-4 mb-2 font-medium bg-blue-500 text-white rounded-full text-center py-5 text-xl">
      <div className="w-1/12 px-5">S.No</div>
      <div className="w-5/12">Topic</div>
      <div className="w-3/12">Score</div>
      <div className="w-3/12">Date And Time</div>
    </div>
    {list?.map((data, index) => (
            <React.Fragment key={index}>

      <div
        key={index}
        className={`flex gap-4 px-2 py-5 hover:font-bold cursor-pointer text-center rounded-full hover:bg-slate-200 items-center`}
        onClick={() => handleRowClick(data)}
      >
         <div className="w-1/12 px-5">{index + 1}</div>
          <div className="w-5/12">{formatTopic(data.topic)}</div>
          <div className="w-3/12">{data.score}/{data.quiz_details.length}</div>
          <div className="w-3/12">{formatDateAndTime(data.id)}</div>
      </div>
      {index < list.length - 1 && (
          <hr className="border-0 h-[2px] ml-5 mr-10 bg-gray-200 " />
        )}
      </React.Fragment>

    ))}
    
  </div>
);
}

export default HistoryList
