import { useNavigate, useParams } from "react-router-dom";
import { projects } from "../data/data";
import { Button, Chip, IconButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { default as LocationIcon } from "@mui/icons-material/FmdGoodOutlined";
import { default as BarChartIcon } from "@mui/icons-material/SignalCellularAltOutlined";
import { default as EnergySavingsLeafIcon } from "@mui/icons-material/EnergySavingsLeafOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { GoogleMap } from "../components/GoogleMap";
import DataTable from "../components/DataTable";

const Project = () => {
  const { projectId } = useParams();

  const project = projects.find((p) => p.id === parseInt(projectId));
  const navigate = useNavigate();

  if (!project) {
    return <div className="text-xl text-red-700">Project not found!</div>;
  }

  const projectDetails = [
    {
      label: "Location",
      value: project.location,
      icon: <LocationIcon sx={{ color: "#777e8b" }} />,
    },
    {
      label: "Annual Emission Reduction",
      value: project.annualEmissionReduction,
      icon: <BarChartIcon sx={{ color: "#777e8b" }} />,
    },
    {
      label: "Technology Type",
      value: project.technologyType,
      icon: <EnergySavingsLeafIcon sx={{ color: "#777e8b" }} />,
    },
    {
      label: "Project Status",
      value: project.projectStatus,
    },
    {
      label: "Verification Standard",
      value: project.verificationStandard,
    },
    {
      label: "Start Date",
      value: project.startDate,
      icon: <CalendarMonthIcon sx={{ color: "#777e8b" }} />,
    },
  ];

  return (
    <div className="w-full pb-10">
      <Chip
        label="Back"
        variant="outlined"
        icon={<ArrowBackIcon />}
        className="!absolute !left-4 !top-4 !w-28 !text-white !backdrop-blur"
        onClick={() => navigate("/projects")}
      />
      
      <img
        src={project.image}
        alt=""
        className="mb-4 max-h-80 w-full object-cover"
      />

      <div className="px-32">
        <div className="mb-6 flex items-center justify-between">
          <Chip label={project.projectType} />
          <div className="flex items-center gap-2">
            <img src={project.countryFlag} alt="" className="h-4 w-6" />
            <p>{project.countryName}</p>
          </div>
        </div>

        <h1 className="mb-2 text-3xl font-bold">{project.title}</h1>
        <p className="mb-4 text-textColor">
          SDG Impact: <span>{project.sdg}</span>
        </p>

        <h2 className="mb-2 text-xl font-bold">Project Overview</h2>
        <p className="text-textColor">{project.description}</p>

        <Divider className="!my-6" />

        <div className="grid grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-bold">Project Details</h2>
            {projectDetails.map((detail, index) => (
              <div className="mb-4 flex gap-1" key={index}>
                {detail.icon}
                <p className="font-bold">
                  {detail.label}:
                  <span className="font-normal"> {detail.value}</span>
                </p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold">Environmental Impact</h2>
            <p className="mb-2 text-textColor">
              {project.environmentalImpact.description}
            </p>
            <h2 className="mb-4 text-xl font-bold">Key Benefits:</h2>

            <ul className="ml-5 list-disc"></ul>
            {project.environmentalImpact.keyBenefits.map((benefit, index) => (
              <li key={index} className="text-textColor">
                {benefit}
              </li>
            ))}
          </div>
        </div>

        <Divider className="!my-6" />

        <h2 className="mb-2 text-xl font-bold">Social and Economic Benefits</h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <li className="rounded-lg bg-green-50 p-4">
            <strong className="text-green-700">Job Creation:</strong>
            <p className="text-textColor">
              {project.socialAndEconomicBenefits.jobCreation}
            </p>
          </li>
          <li className="rounded-lg bg-blue-50 p-4">
            <strong className="text-blue-700">Energy Access:</strong>
            <p className="text-textColor">
              {project.socialAndEconomicBenefits.energyAccess}
            </p>
          </li>
          <li className="rounded-lg bg-yellow-50 p-4">
            <strong className="text-yellow-700">Economic Growth:</strong>
            <p className="text-textColor">
              {project.socialAndEconomicBenefits.economicGrowth}
            </p>
          </li>
          <li className="rounded-lg bg-purple-50 p-4">
            <strong className="text-purple-700">Infrastructure:</strong>
            <p className="text-textColor">
              {project.socialAndEconomicBenefits.infrastructure}
            </p>
          </li>
        </ul>
        <Divider className="!my-6" />

        <h2 className="mb-2 text-xl font-bold">Project Location</h2>

        <GoogleMap coordinates={project.coordinate} />

        <Divider className="!my-6" />

        <h2 className="mb-2 text-xl font-bold">Project Data</h2>

        <DataTable />

        <div className="mt-5 flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-green-600">
              {project.price}
            </div>
            <span className="text-sm text-textColor">per carbon credit</span>
          </div>

          <Button variant="contained" sx={{ backgroundColor: "black" }}>
            Invest in This Project
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Project;
