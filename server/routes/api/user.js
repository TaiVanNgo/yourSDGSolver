const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Project = require("../../models/projects");

router.post("/login", async (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ error: "Wallet address is required" });
  }

  try {
    const user = await User.findOne({ walletAddress });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract the role
    const { role } = user;

    return res.status(200).json({
      message: "Login successful",
      role,
      id: user._id,
    });
  } catch {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/inventory", async (req, res) => {
  try {
    const userId = req.query.userId;

    const user = await User.findById(userId).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const projectIds = user.carbonCredit.projects.map((p) => p.id);

    const projects = await Project.find({ _id: { $in: projectIds } }).lean();

    let totalPriceSum = 0;

    const enhancedProjects = user.carbonCredit.projects.map((userProject) => {
      const project = projects.find((p) => p._id.toString() === userProject.id);
      const pricePerCredit = project
        ? parseFloat(project.price.replace("$", ""))
        : 0;
      const totalPrice = pricePerCredit * userProject.credits;

      totalPriceSum += totalPrice;

      return {
        id: userProject.id,
        credits: userProject.credits,
        status: userProject.status,
        name: project ? project.title : "Unknown Project",
        pricePerCredit: project ? project.price : "$0.00",
        totalPrice: `$${totalPrice.toFixed(2)}`,
      };
    });

    res.status(200).json({
      totalCredits: user.carbonCredit.totalCredits,
      usedCreditNumber: user.carbonCredit.usedCreditNumber,
      totalCreditNumber: user.carbonCredit.totalCreditNumber,
      totalPrice: `$${totalPriceSum.toFixed(2)}`,
      projects: enhancedProjects,
    });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ message: "Error fetching inventory", error });
  }
});

router.post("/buy", async (req, res) => {
  const { userId, projectId, creditsToBuy } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.availableCarbonCredits < creditsToBuy) {
      return res.status(400).json({
        message: `Not enough credits available. Only ${project.availableCarbonCredits} credits left.`,
      });
    }

    project.availableCarbonCredits -= creditsToBuy;
    await project.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingProjectIndex = user.carbonCredit.projects.findIndex(
      (p) => p.id === projectId
    );

    if (existingProjectIndex > -1) {
      user.carbonCredit.projects[existingProjectIndex].credits += creditsToBuy;
    } else {
      user.carbonCredit.projects.push({
        id: projectId,
        credits: creditsToBuy,
        status: true, 
      });
    }

    user.totalCredits = (user.totalCredits || 0) + creditsToBuy;
    user.carbonCredit.totalCreditNumber =
      (user.carbonCredit.totalCreditNumber || 0) + creditsToBuy;

    await user.save();

    res.status(200).json({
      message: "Carbon credits purchased successfully.",
      project: {
        id: projectId,
        credits: creditsToBuy,
      },
      user: {
        totalCredits: user.totalCredits,
        totalCreditNumber: user.carbonCredit.totalCreditNumber,
      },
    });
  } catch (error) {
    console.error("Error buying carbon credits:", error);
    res.status(500).json({ message: "Error buying carbon credits", error });
  }
});

module.exports = router;
