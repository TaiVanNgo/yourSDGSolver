import { Card } from "@mui/material";

const ProjectList = () => {
  //

  return (
    <div>
      <Card className="!relative !h-80 !w-72 cursor-pointer">
        <img
          src="https://climatetrade.s3.amazonaws.com/media/projects/main_imagesong-giang-2-hydro-power-project_JiJt5gn.webp"
          alt=""
          className="!absolute !h-full !w-full !object-cover"
        />

        <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-40"></div>

        <div className="relative flex h-full flex-col justify-end px-6 py-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-bold text-white">CARBON OFFSETTING</p>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png"
              alt=""
              className="h-4 w-6"
            />
          </div>
          <p className="mb-2 text-base text-white">
            Song Giang 2 Hydro Power Project
          </p>
          <p className="text-lg text-white">$1.83</p>
        </div>
      </Card>
    </div>
  );
};
export default ProjectList;
