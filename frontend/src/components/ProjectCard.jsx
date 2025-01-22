import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({
  id,
  projectType,
  projectName,
  imgSource,
  countryFlag,
  price,
  sdgNum,
}) => {
  const navigate = useNavigate();

  const handleClick = (projectId) => {
    navigate(`${projectId}`);
  };

  return (
    <Card
      className="group !relative !h-80 !w-72 cursor-pointer overflow-hidden !rounded-lg !shadow-dark-xl"
      onClick={() => {
        handleClick(id);
      }}
    >
      <img
        src={imgSource}
        alt=""
        className="!absolute !h-full !w-full !object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
      />

      <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-30"></div>

      <div className="relative flex h-full flex-col justify-end px-6 py-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-bold text-white">{projectType}</p>
          <img src={countryFlag} alt="" className="h-4 w-6" />
        </div>
        <p className="mb-2 text-base text-white">{projectName}</p>
        <div className="flex justify-between">
          <p className="text-lg text-white">{price}</p>
          <div className="flex items-center gap-1 rounded-3xl bg-white/20 px-1">
            <img src="sdg-logo.png" alt="" className="h-8 w-8" />
            <p className="text-white">{sdgNum}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default ProjectCard;
