import { Button, Card, CardContent, CardHeader } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { default as TreeIcon } from "@mui/icons-material/ForestOutlined";
import { default as ArrowIcon } from "@mui/icons-material/ArrowForwardOutlined";
import { default as MoneyIcon } from "@mui/icons-material/AttachMoneyOutlined";
import { default as PeopleIcon } from "@mui/icons-material/PeopleAltOutlined";
import { default as CertIcon } from "@mui/icons-material/VerifiedUserOutlined";
import { default as ChartIcon } from "@mui/icons-material/PeopleAltOutlined";
import NatureIcon from "@mui/icons-material/Nature";
import { default as QuestionIcon } from "@mui/icons-material/HelpOutline";

const FarmerCardContent = [
  {
    icon: <MoneyIcon sx={{ color: "green" }} />,
    content: "Earn More: Generate additional income by selling carbon credits.",
  },
  {
    icon: <NatureIcon sx={{ color: "green" }} />,
    content:
      "Support Sustainability: Showcase your contribution to combating climate change.",
  },
  {
    icon: <ChartIcon sx={{ color: "green" }} />,
    content:
      "Simple Process: Track your credits and earnings easily through our app.",
  },
];

const BuyerCardContent = [
  {
    icon: <NatureIcon sx={{ color: "green" }} />,
    content:
      "Offset Carbon: Make your business or personal operations more sustainable.",
  },
  {
    icon: <PeopleIcon sx={{ color: "green" }} />,
    content:
      "Support Farmers: Directly contribute to the livelihoods of cashew farmers.",
  },
  {
    icon: <CertIcon sx={{ color: "green" }} />,
    content:
      "Verified Credits: Each credit is tracked and validated for transparency.",
  },
];

const HowItWorkContent = [
  {
    title: "1. Farmers Register",
    content:
      "Farmers sign up, link their cashew farms, and begin tracking carbon sequestration.",
  },
  {
    title: "2. Credits Are Generated",
    content:
      "Verified data converts the carbon absorbed by trees into carbon credits.",
  },
  {
    title: "3. Buyers Offset Carbon",
    content:
      "Buyers purchase these credits directly from farmers via the platform.",
  },
];

const StoryContent = [
  {
    title: "Farmer's Story",
    content: `"Since joining, I've doubled my income by selling carbon credits while continuing to farm cashews."`,
  },
  {
    title: "Buyer's Story",
    content: `"Our company achieved net-zero emissions thanks to the credits purchased from this platform."`,
  },
];

const QuestionContent = [
  {
    title: "What are carbon credits?",
    content:
      "Carbon credits represent the amount of carbon dioxide absorbed by trees. Farmers can sell these to offset emissions.",
  },
  {
    title: "How are credits verified?",
    content:
      "We use reliable methods and partnerships to ensure every credit is accurate and credible.",
  },
];

const ActionCard = ({
  title,
  buttonContent,
  listContent,
  handleClick = () => {},
}) => {
  return (
    <Card className="!rounded-lg !p-6" sx={{ height: "100%" }}>
      <CardHeader
        title={title}
        sx={{
          ".MuiCardHeader-title": {
            fontWeight: "bold",
          },
        }}
      />

      <CardContent>
        <div className="h-48 space-y-6">
          {listContent.map((item, index) => (
            <div className="flex items-center gap-4" key={index}>
              {item.icon}
              <p className="text-lg text-textColor">{item.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <Button
        variant="contained"
        fullWidth
        sx={{ backgroundColor: "black", mt: 4 }}
        onClick={() => handleClick()}
      >
        {buttonContent}
      </Button>
    </Card>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="pb-10">
      <div className="relative bg-red-400 pb-10 text-white">
        <img
          src="https://t3.ftcdn.net/jpg/01/94/39/96/360_F_194399685_4xJXBSMRzD5Ay50yvPsMj2rht1NI8712.jpg"
          alt="cashew background"
          className="absolute z-0 h-96 w-full object-cover"
        />

        <div className="absolute h-96 w-full bg-black/60"></div>

        <div className="relative z-10 pt-20">
          <h1 className="mb-4 text-center text-6xl font-bold">
            Turn Cashew Trees Into Prosperity
          </h1>
          <h2 className="mb-6 text-center text-2xl font-normal">
            Helping farmers earn more and buyers offset their carbon footprint
            through sustainable cashew farming
          </h2>

          <div className="mx-auto flex w-fit gap-10">
            <Button
              variant="contained"
              className="!bg-white !px-4 !py-2 !text-lg !text-green-600"
              sx={{
                textTransform: "none",
              }}
            >
              Start Earning Now
            </Button>

            <Button
              variant="outlined"
              className="!border-white !bg-transparent !px-4 !py-2 !text-lg !text-white hover:!bg-white hover:!text-green-600"
              sx={{
                textTransform: "none",
              }}
            >
              Offset Carbon Today
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-10 px-20 py-10">
        <div className="py-10">
          <p className="mb-4 text-center text-4xl font-bold">
            Empowering Cashew Farmers and Sustainable Buyers
          </p>
          <p className="mb-6 text-center text-xl text-textColor">
            Our platform bridges the gap between cashew farmers and
            environmentally conscious buyers. By growing cashew trees, farmers
            capture carbon dioxide, generating valuable carbon credits. Buyers
            can purchase these credits to reduce their carbon footprint,
            creating a win-win for both the planet and your pocket.
          </p>
          <div className="mx-auto flex w-fit gap-4">
            <TreeIcon sx={{ color: "green" }} fontSize="large" />
            <ArrowIcon sx={{ color: "green" }} fontSize="large" />
            <CertIcon sx={{ color: "green" }} fontSize="large" />
            <ArrowIcon sx={{ color: "green" }} fontSize="large" />
            <MoneyIcon sx={{ color: "green" }} fontSize="large" />
            <ArrowIcon sx={{ color: "green" }} fontSize="large" />
            <PeopleIcon sx={{ color: "green" }} fontSize="large" />
            <ArrowIcon sx={{ color: "green" }} fontSize="large" />
            <ChartIcon sx={{ color: "green" }} fontSize="large" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 py-10">
          <ActionCard
            title="Why Join as a Farmer?"
            buttonContent="Sign Up as a Farmer"
            listContent={FarmerCardContent}
          />

          <ActionCard
            title="Why Purchase Carbon Credits?"
            buttonContent="Browse Carbon Credits"
            listContent={BuyerCardContent}
            handleClick={() => navigate("/projects")}
          />
        </div>

        <div className="space-y-10 py-10">
          <h1 className="text-center text-4xl font-bold">How Does It Work?</h1>
          <div className="grid grid-cols-3 gap-6">
            {HowItWorkContent.map((item, index) => (
              <Card className="!rounded-lg" key={index}>
                <CardHeader
                  title={item.title}
                  sx={{
                    ".MuiCardHeader-title": {
                      fontWeight: "bold",
                    },
                  }}
                />

                <CardContent>{item.content}</CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-10 py-10">
          <h1 className="text-center text-4xl font-bold">
            Real Stories, Real Impact
          </h1>
          <div className="grid grid-cols-2 gap-10">
            {StoryContent.map((item, index) => (
              <Card className="!rounded-lg" key={index}>
                <CardHeader
                  title={item.title}
                  sx={{
                    ".MuiCardHeader-title": {
                      fontWeight: "bold",
                    },
                  }}
                />

                <CardContent>{item.content}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-green-600 py-14 text-white">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Join the Movement Today
        </h2>

        <div className="mx-auto flex w-fit gap-10">
          <Button
            variant="contained"
            className="!bg-white !px-4 !py-2 !text-lg !text-green-600"
            sx={{
              textTransform: "none",
            }}
          >
            Register your Farm
          </Button>

          <Button
            variant="outlined"
            className="!border-white !bg-transparent !px-4 !py-2 !text-lg !text-white hover:!bg-white hover:!text-green-600"
            sx={{
              textTransform: "none",
            }}
            onClick={() => navigate("/projects")}
          >
            Browse Credits
          </Button>
        </div>
      </div>

      <div className="pt-10">
        <h1 className="mb-8 text-center text-4xl font-bold">Got Questions?</h1>

        <div className="grid grid-cols-2 gap-8 px-20">
          {QuestionContent.map((item, index) => (
            <Card className="!rounded-lg" key={index}>
              <CardContent>
                <div className="flex items-center gap-4">
                  <QuestionIcon />
                  <p className="mb-2 text-2xl font-bold">{item.title}</p>
                </div>

                <p>{item.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
