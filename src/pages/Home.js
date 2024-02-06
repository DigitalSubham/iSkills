import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import HighLightText from "../components/core/HomePage/HighLightText";
import Button from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimeLine from "../components/core/HomePage/TimeLine";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Reviews from "../components/core/HomePage/Reviews";
import ExplreMore from "../components/core/HomePage/ExplreMore";

const Home = () => {
  return (
    <div>
      {/* {Section 1} */}

      <div className="  relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent  text-white justify-between">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-gradient-to-r from-richblack-800 via-richblack-600 to-richblack-400  font-bold text-richblack-200 transition-all duration-200 hover:scale-95 ">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-6">
          Empower Your Future with <HighLightText text="Coding Skills" />
        </div>
        <div className="mt-4 w-[70%] text-center   text-richblack-300 text-base">
          Embark on a coding adventure with our online courses, offering the
          flexibility to learn at your own pace, from anywhere globally. Access
          a rich array of resources, including hands-on projects, quizzes, and
          personalized instructor feedback.
        </div>
        <div className="flex flex-row gap-7 mt-8">
          <Button active={true} linkto="/login">
            Learn More
          </Button>
          <Button active={false} linkto="/signup">
            Book a Demo
          </Button>
        </div>
        <div className="shadow-blue-100 mx-40 my-12 ">
          <video muted loop autoPlay className="rounded-md">
            {" "}
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* {code section 1} */}
        <div className="ml-28">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your <HighLightText text={"coding potential"} />
                with our online courses
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            btn1={{
              active: true,
              linkto: "/signup",
              ButtonText: "Try it Yourself",
            }}
            btn2={{
              active: false,
              linkto: "/login",
              ButtonText: "Learn More",
            }}
            codeBlock={`<!DOCTYPE html>
<html>
<head>
    <title>Example</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1><a href="/">Header</a></h1>
    <nav>
        <a href="one/">One</a>
        <a href="two/">Two</a>
        <a href="three/">Three</a>
    </nav>
</body>
</html>
`}
            codeColor={"text-yellow-200"}
          />
        </div>
        {/* {code section 2} */}
        <div className="ml-20 mr-10">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start <HighLightText text={"coding in seconds"} />
              </div>
            }
            subHeading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            btn1={{
              active: true,
              linkto: "/signup",
              ButtonText: "Continue lesson",
            }}
            btn2={{
              active: false,
              linkto: "/login",
              ButtonText: "Learn More",
            }}
            codeBlock={`<!DOCTYPE html>
<html>
<head>
    <title>Example</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1><a href="/">Header</a></h1>
    <nav>
        <a href="one/">One</a>
        <a href="two/">Two</a>
        <a href="three/">Three</a>
    </nav>
</body>
</html>
`}
            codeColor={"text-yellow-200"}
          />
        </div>

        <ExplreMore />
      </div>

      {/* {Section 2} */}
      <div className="bg-pure-greys-5 text-richblack-700">
        {/* section 2.1 */}
        <div className="homepage_bg h-[280px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto">
            <div className="h-[170px]"></div>
            <div className="flex flex-row gap-7 text-white">
              <Button active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog <FaArrowRight />
                </div>
              </Button>
              <Button active={false} linkto={"/signup"}>
                <div className="">Learn More</div>
              </Button>
            </div>
          </div>
        </div>
        {/* section 2.2 */}
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex flex-row gap-5 mb-10 mt-24  ml-16">
            <div className="text-4xl font-semibold w-[45%]">
              Get the skills you need for a{" "}
              <HighLightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col gap-10  w-[40%] items-start">
              <div className="text-[16px] ">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <Button active={true} linkto={"/signup"}>
                <div>Learn More</div>
              </Button>
            </div>
          </div>
          <TimeLine />
          <LearningLanguageSection />
        </div>
      </div>
      {/* {Section 3} */}
      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-800 text-white">
        <InstructorSection />
        <Reviews />
      </div>
    </div>
  );
};

export default Home;
