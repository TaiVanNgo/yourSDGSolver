import {
  Accordion,
  Drawer,
  ListItem,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const projectKinds = [
  { label: "Biodiversity" },
  { label: "Carbon forward" },
  { label: "Carbon offsetting" },
  { label: "Contribution" },
  { label: "Energy Attributes Certificate (EACs)" },
];

const FilterMenu = () => {
  const [checkedStates, setCheckedStates] = useState(
    projectKinds.map(() => false), // Initialize all checkboxes as unchecked
  );


  const handleToggle = (index) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };

  return (
    <div className="">
      <p className="text-xl font-black">Filter Menu</p>
      <Accordion
        disableGutters
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          "&:before": {
            display: "none", // Removes the border line before the accordion
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            padding: 0,
            "& .MuiAccordionSummary-content": {
              margin: 0,
            },
          }}
        >
          <p>Project kind</p>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col gap-1" sx={{ padding: 0 }}>
          {projectKinds.map((kind, index) => (
            <div
              key={kind.label}
              className="flex cursor-pointer items-center gap-1"
              onClick={() => handleToggle(index)}
            >
              <Checkbox
                checked={checkedStates[index]}
                onChange={() => handleToggle(index)}
              />
              <p style={{ margin: 0 }}>{kind.label}</p>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default FilterMenu;
