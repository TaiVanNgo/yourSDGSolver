import FilterMenu from "../components/FilterMenu";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/data";

const ProjectList = () => {
  return (
    <div className="flex w-full gap-10 px-8 py-10">
      <div className="w-[20%]">
        <FilterMenu />
      </div>
      <div className="mx-auto grid h-fit grid-cols-3 flex-wrap gap-10">
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            id={p.id}
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
