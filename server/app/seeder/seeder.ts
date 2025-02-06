import mongoose from "mongoose";
import User from "../user/user.schema"; // adjust path based on your project structure
import Project from "../project/project.schema"; // adjust path based on your project structure
import { configDotenv } from "dotenv";
import brcypt from "bcryptjs";
configDotenv({});
const seedData = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://harkirola75way:Harsh123@cluster0.pdvck.mongodb.net/Practice?retryWrites=true&w=majority&appName=Cluster0"
    );
    let hashedPassword = await brcypt.hash("adminpassword", 10);

    const adminUser = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
      walletBalance: 1000,
    });
    hashedPassword = await brcypt.hash("userpassword", 10);

    const regularUser = new User({
      name: "Regular User",
      email: "user@example.com",
      password: hashedPassword,
      role: "USER",
      walletBalance: 100,
    });

    await adminUser.save();
    await regularUser.save();

    console.log("Users seeded");

    const project1 = new Project({
      title: "Awesome Code Project",
      description: "This is an amazing source code for web developers.",
      screenshots: ["screenshot1.png", "screenshot2.png"],
      sourceCode: "https://github.com/user/repo1",
      owner: regularUser._id,
      price: 50.0,
      shortDescription: "Short description of the project.",
      purchaseCount: 10,
    });

    const project2 = new Project({
      title: "Another Great Project",
      description: "This project is for building great apps.",
      screenshots: ["screenshot1.png"],
      sourceCode: "https://github.com/user/repo2",
      owner: adminUser._id,
      price: 100.0,
      shortDescription: "Short description of the project.",
      purchaseCount: 5,
    });

    await project1.save();
    await project2.save();

    console.log("Projects seeded");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seedData();
