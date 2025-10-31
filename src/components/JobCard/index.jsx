import React from 'react';
import dayjs from 'dayjs';

function JobCard({
  title,
  company,
  type,
  experience,
  location,
  skills = [], //default empty array to avoid map() error
  postedOn,
  job_link
}) {
  const now = dayjs();
  const postDate = dayjs(postedOn);

  // Auto-correct old or invalid date
  const diffInDays = Math.max(0, now.diff(postDate.isValid() ? postDate : now, 'day'));

  return (
    <div className='mx-4 md:mx-40 mb-4'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-6 py-4 bg-zinc-200 rounded-md border border-black shadow-lg hover:border-blue-500 hover:translate-y-1 hover:scale-[1.03] transition-transform'>
        
        {/* LEFT SIDE */}
        <div className='flex flex-col items-start gap-3'>
          <h1 className='text-lg font-semibold'>{title} - {company}</h1>
          <p>{type} &#x2022; {experience} &#x2022; {location}</p>

          <div className='flex items-center gap-2 flex-wrap'>
            {skills.length > 0 ? (
              skills.map((skill) => (
                <p
                  key={skill} //  unique key
                  className='text-gray-700 py-1 px-2 rounded-md border border-black'
                >
                  {skill}
                </p>
              ))
            ) : (
              <p className='text-gray-400 italic'>Skills not specified</p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className='flex items-center gap-4'>
          <p className='text-gray-500'>
            {diffInDays === 0
              ? 'Posted today'
              : diffInDays === 1
              ? 'Posted 1 day ago'
              : `Posted ${diffInDays} days ago`}
          </p>

          <a href={job_link} target="_blank" rel="noopener noreferrer">
            <button className='text-blue-500 border border-blue-500 px-10 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors'>
              Apply
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default JobCard;



