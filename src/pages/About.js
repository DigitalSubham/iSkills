import React from "react";
import HighLightText from "../components/core/HomePage/HighLightText";
import aboutus1 from "../assets/Images/aboutus1.webp";
import aboutus2 from "../assets/Images/aboutus2.webp";
import aboutus3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/About/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png";
import StatsComponent from "../components/core/About/StatsComponent";
import LearningGrid from "../components/core/About/LearningGrid";
import ContactFormSection from "../components/core/About/ContactFormSection";

const About = () => {
  return (
    <div className="text-white mt-24 w-11/12 max-w-maxContent mx-auto">
      {/* section 1 */}
      <section>
        <div>
          <header>
            Driving Innovation in Online Education for a{" "}
            <HighLightText text={"Brighter Future"} />
            <p>
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
        </div>
        <div className="flex gap-x-3">
          <img src={aboutus1} alt="aboutus1" />
          <img src={aboutus2} alt="aboutus2" />
          <img src={aboutus3} alt="aboutus3" />
        </div>
      </section>
      {/* section 2 */}
      <section>
        <div>
          <Quote />
        </div>
      </section>
      {/* section 3 */}
      <section>
        <div className="flex flex-col">
          <div className="flex">
            <div>
              <h1>Our Founding Story </h1>
              <p>
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p>
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            <div>
              <img src={FoundingStory} alt="FoundingStory" />
            </div>
          </div>
          {/* visison and mission */}
          <div className="flex">
            {/* left */}
            <div>
              <h1>Our Vision</h1>
              <p>
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            {/* right */}
            <div>
              <h1>Our Mission</h1>
              <p>
                our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* section 4 */}
      <section>
        <StatsComponent />
      </section>
      {/* section 5 */}
      <section className="mx-auto flex flex-col items-center justify-center gap-5 mb-36">
        <LearningGrid />
        <ContactFormSection />
      </section>
      {/* section 6 reviews */}
      <div>
        Reviews from other learners
        {/* Reviews */}
      </div>
    </div>
  );
};

export default About;
