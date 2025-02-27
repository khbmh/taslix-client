import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { compareAsc, format } from 'date-fns';
import toast from 'react-hot-toast';

const JobDetails = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [deadline, setDeadline] = useState(new Date());
  const [job, setJob] = useState([]);
  useEffect(() => {
    fetchJob();
  }, [id]);
  console.log(job);
  const fetchJob = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/job/${id}`,
    );
    setJob(data);
    setDeadline(new Date(data?.deadline));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const bidData = {
      price: form.price.value,
      email: user.email,
      comment: form.comment.value,
      deliveryDate: startDate,
      jobId: job._id,
      jobTitle: job.title,
      category: job.category,
      buyerEmail: job.buyer.email,
      status: 'Pending',
    };
    if (bidData.price > job.max_price)
      return toast.error(`max price($${job?.max_price}) exceeded`);

    if (compareAsc(new Date(deadline), new Date(bidData.deliveryDate)) < 0)
      return toast.error('delivery date exceeded');
    try {
      // make a post request
      await axios.post(`${import.meta.env.VITE_API_URL}/add-bid`, bidData);
      form.reset();
      toast.success('Bid posted successfully');
      navigate('/my-bids');
    } catch (err) {
      toast.error(err?.response?.data || 'something went wrong');
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto ">
      {/* Job Details */}
      <div className="flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800 ">
            Deadline: {format(new Date(deadline), 'PP')}
          </span>
          <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200/30 rounded-full ">
            {job?.category}
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800 ">
            {job?.title}
          </h1>

          <p className="mt-2 text-lg text-gray-600 ">{job?.description}</p>
          <p className="mt-6 text-sm font-bold text-gray-600 ">
            Buyer Details:
          </p>
          <div className="flex items-center gap-5">
            <div>
              <p className="mt-2 text-sm  text-gray-600 ">
                Name: {job?.buyer?.name}
              </p>
              <p className="mt-2 text-sm  text-gray-600 ">
                Email: {job?.buyer?.email}
              </p>
            </div>
            <div className="rounded-full object-cover overflow-hidden w-14 h-14">
              <img
                className="border border-blue-300 rounded-full"
                referrerPolicy="no-referrer"
                src={job?.buyer?.photo}
                alt={job?.buyer?.name}
              />
            </div>
          </div>
          <p className="mt-6 text-lg font-bold text-gray-600 ">
            Range: ${job?.min_price} - ${job?.max_price}
          </p>
        </div>
      </div>
      {/* Place A Bid Form */}
      <section className="p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Place A Bid
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="price">
                Price
              </label>
              <input
                id="price"
                type="text"
                name="price"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                defaultValue={user.email}
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="comment">
                Comment
              </label>
              <input
                id="comment"
                name="comment"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Delivery Date</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className="border p-2 rounded-md"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={
                user.email === job?.buyer?.email ||
                compareAsc(new Date(), new Date(deadline)) > 0
              }
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 disabled:opacity-50"
            >
              Place Bid
            </button>
          </div>
          {user?.email === job?.buyer?.email ? (
            <p className="text-sm text-red-600">Buyer can't bid.</p>
          ) : (
            compareAsc(new Date(), new Date(deadline)) > 0 && (
              <p className="text-sm text-red-600">Deadline Crossed</p>
            )
          )}
        </form>
      </section>
    </div>
  );
};

export default JobDetails;
