/* eslint-disable react/prop-types */
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const deadline = format(new Date(job.deadline), 'PP');
  return (
    <Link
      to={`/job/${job._id}`}
      className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-light text-gray-800 ">
          Deadline: {deadline}
        </span>
        <span
          className={`px-3 py-1 ${
            job.category === 'Web Development' &&
            ' text-blue-600 bg-blue-100/30'
          } 
                                ${
                                  job.category === 'Digital Marketing' &&
                                  ' text-red-600 bg-red-100/30'
                                }
                                ${
                                  job.category === 'Graphics Design' &&
                                  ' text-yellow-600 bg-yellow-100/30'
                                }
                                text-xs  rounded-full`}
        >
          {job.category}
        </span>
      </div>

      <div>
        <h1 className="mt-2 text-lg font-semibold text-gray-800 ">
          {job.title}
        </h1>

        <p className="mt-2 text-sm text-gray-600 ">
          {job.description.substring(0, 60)}...
        </p>
        <p className="mt-2 text-sm font-bold text-gray-600 ">
          Range: ${job.min_price} - ${job.max_price}
        </p>
        <p className="mt-2 text-sm font-bold text-gray-600 ">
          Total Bids: {job.bid_count}
        </p>
      </div>
    </Link>
  );
};

export default JobCard;
