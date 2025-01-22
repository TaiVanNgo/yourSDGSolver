import { useState } from "react";
import FilterMenu from "../components/FilterMenu";
import ProjectCard from "../components/ProjectCard";
import { useEffect } from "react";
import Loading from "../components/Loading";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/projects");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex w-full gap-10 px-8 py-10">
      <div className="w-[20%]">
        <FilterMenu />
      </div>
      <div className="mx-auto grid h-fit grid-cols-3 flex-wrap gap-10">
        {projects.map((p) => (
          <ProjectCard
            key={p._id}
            id={p._id}
            projectType={p.projectType}
            projectName={p.title}
            imgSource={p.image}
            countryFlag={p.countryFlag}
            price={p.price}
            sdgNum={p.sdg}
          />
        ))}
      </div>
    </div>
  );
};
export default ProjectList;
