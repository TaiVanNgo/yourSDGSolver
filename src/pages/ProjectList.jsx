import FilterMenu from "../components/FilterMenu";
import ProjectCard from "../components/ProjectCard";

const ProjectList = () => {
  const projects = [
    {
      id: 1,
      projectType: "CARBON OFFSETTING",
      title: "Song Giang 2 Hydro Power Project",
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png",
      price: "€1.83",
      sdg: 4,
      image:
        "https://climatetrade.s3.amazonaws.com/media/projects/main_imagesong-giang-2-hydro-power-project_JiJt5gn.webp",
    },
    {
      id: 2,
      projectType: "CARBON OFFSETTING",
      title: "Redd+ Project In Nut Concessions In Madre De Dios",
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Flag_of_Peru_%28state%29.svg/1280px-Flag_of_Peru_%28state%29.svg.png",
      price: "€9.15",
      sdg: 8,
      image:
        "https://climatetrade.s3.amazonaws.com/media/projects/main_imageredd-project-in-nut-concessions-in-madre-de-dios-peru_jAEPnSx.webp",
    },
    {
      id: 3,
      projectType: "CARBON OFFSETTING",
      title: "Nansha Hydro Power Project In Yunnan Province",
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/800px-Flag_of_the_People%27s_Republic_of_China.svg.png",
      price: "€3.36",
      sdg: 3,
      image:
        "https://climatetrade.s3.amazonaws.com/media/projects/main_imagenansha-hydro-power-project-in-yunnan-province-china_1uUpBVA.webp",
    },
    {
      id: 4,
      projectType: "CARBON OFFSETTING",
      title: "Conversion Of SF6 To Alternative Cover Gas",
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/2560px-Flag_of_Brazil.svg.png",
      price: "€1.34",
      sdg: 4,
      image:
        "https://climatetrade.s3.amazonaws.com/media/projects/main_imageconversion-of-sf6-to-the-alternative-cover-gas-so2-at-rima-magnesium-production_x4fPnKg.webp",
    },
    {
      id: 5,
      projectType: "CARBON OFFSETTING",
      title: "100 MW Solar Project In Rajasthan - Corsia Eligible",
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/800px-Flag_of_India.svg.png",
      price: "€4.03",
      sdg: 3,
      image:
        "https://climatetrade.s3.amazonaws.com/media/projects/main_image100-mw-solar-project-in-rajasthan-corsia-elegible_3A4WMZt.webp",
    },
    {
      id: 6,
      projectType: "CARBON OFFSETTING",
      title: "MDL 0297 IAGEO S.A. De C.V., Berlin Geothermal",
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/2560px-Flag_of_Argentina.svg.png",
      price: "€5.62",
      sdg: 15,
      image:
        "https://climatetrade.s3.amazonaws.com/media/projects/main_imagemdl-0297-lageo-s-a-de-c-v-berlin-geothermal-project-phase-two_JmjAJN7.webp",
    },
    {
      id: 7,
      projectType: "CARBON OFFSETTING",
      title: "MDL 0297 IAGEO S.A. De C.V., Berlin Geothermal",
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/2560px-Flag_of_Argentina.svg.png",
      price: "€5.62",
      sdg: 15,
      image:
        "https://climatetrade.s3.amazonaws.com/media/projects/main_imagemdl-0297-lageo-s-a-de-c-v-berlin-geothermal-project-phase-two_JmjAJN7.webp",
    },
    {
      id: 8,
      projectType: "CARBON OFFSETTING",
      title: "MDL 0297 IAGEO S.A. De C.V., Berlin Geothermal",
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/2560px-Flag_of_Argentina.svg.png",
      price: "€5.62",
      sdg: 15,
      image:
        "https://climatetrade.s3.amazonaws.com/media/projects/main_imagemdl-0297-lageo-s-a-de-c-v-berlin-geothermal-project-phase-two_JmjAJN7.webp",
    },
  ];

  return (
    <div className="flex w-full gap-10 py-10">
      <div className="w-[20%]">
        <FilterMenu />
      </div>
      <div className="mx-auto grid h-fit grid-cols-3 flex-wrap gap-10">
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
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
