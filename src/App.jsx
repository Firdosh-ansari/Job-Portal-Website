import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "./firebase.config";

function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);

  //Fetch All Jobs
  const fetchJobs = async () => {
    setCustomSearch(false);
    const tempJobs = [];
    const jobsRef = query(collection(db, "jobs"), orderBy("postedOn", "desc"));
    const req = await getDocs(jobsRef);

    req.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      });
    });
    setJobs(tempJobs);
  };

  //Custom Search (case-insensitive)
  const fetchJobsCustom = async (jobCriteria) => {
    setCustomSearch(true);
    const tempJobs = [];
    const jobsRef = query(collection(db, "jobs"), orderBy("postedOn", "desc"));
    const req = await getDocs(jobsRef);

    req.forEach((job) => {
      const data = job.data();

      const matchTitle =
        !jobCriteria.title ||
        data.title.toLowerCase() === jobCriteria.title.toLowerCase();

      const matchType =
        !jobCriteria.type ||
        data.type.toLowerCase() === jobCriteria.type.toLowerCase();

      const matchExperience =
        !jobCriteria.experience ||
        data.experience.toLowerCase() === jobCriteria.experience.toLowerCase();

      const matchLocation =
        !jobCriteria.location ||
        data.location.toLowerCase() === jobCriteria.location.toLowerCase();

      if (matchTitle && matchType && matchExperience && matchLocation) {
        tempJobs.push({
          ...data,
          id: job.id,
          postedOn: data.postedOn.toDate(),
        });
      }
    });

    setJobs(tempJobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <Header />

      {/*SearchBar */}
      <SearchBar fetchJobsCustom={fetchJobsCustom} />

      {/*Clear Filter Button below Search */}
      {customSearch && (
        <div className="flex justify-center mb-8">
          <button
            onClick={fetchJobs}
            className="bg-blue-500 text-white px-10 py-3 rounded-md font-semibold hover:bg-blue-600 transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/*Job List */}
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
}

export default App;

