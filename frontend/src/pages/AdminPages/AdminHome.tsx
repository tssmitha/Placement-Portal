import React,{useEffect , useRef} from "react";
import './AdminHome.css';
import './AdminTaskbar';
import AdminTaskbar from "./AdminTaskbar";
import Sidebar from "../../components/Sidebar";

const AdminHome : React.FC < {isAdmin : boolean}> = ( { isAdmin})=> {
  <Sidebar />
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: string) => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollWidth = carousel.scrollWidth;
      const imageWidth = carousel.firstElementChild?.clientWidth || 300;

      if (direction === "left") {
        if (carousel.scrollLeft === 0) {
          // Jump to the end for seamless transition
          carousel.scrollLeft = scrollWidth - carousel.clientWidth;
        }
        carousel.scrollBy({ left: -imageWidth, behavior: "smooth" });
      } else if (direction === "right") {
        if (carousel.scrollLeft + carousel.clientWidth >= scrollWidth) {
          // Jump to the start for seamless transition
          carousel.scrollLeft = 0;
        }
        carousel.scrollBy({ left: imageWidth, behavior: "smooth" });
      }
    }
  };

  // Automatically scroll every 10 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      scrollCarousel("right");
    }, 10000); // Change every 10 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Ensure the carousel starts at the proper position when the component mounts
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollLeft = 0; // Start from the first image
    }
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (videoContainerRef.current) {
      const scrollAmount = videoContainerRef.current.offsetWidth;
      if (direction === "left") {
        videoContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        videoContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  // const videoUrls = [
  //   "https://www.youtube.com/watch?v=ymR5olxTS_A",
  // ];

    return(
      // <AdminTaskbar>
        <div className="admin-home">
          <section className="welcome-section">
      <h1 className="welcome-title">Welcome to the Placement Portal</h1>
      <div className="welcome-content">
        <p>
          The <strong>National Institute of Engineering (NIE)</strong>, established in 1946, stands tall among India’s premier engineering institutions. Ranked in the 151–200 band by the <strong>National Institutional Ranking Framework (NIRF 2023)</strong> and 17th among top engineering colleges in India as per <em>The Week</em> survey, NIE continues to uphold its legacy of excellence.
        </p>
        <h2>Academic Excellence</h2>
        <p>
          NIE operates across two campuses: 
          <ul>
            <li>
              <strong>NIE North Campus:</strong> Specializes in Computer Science & Engineering, Information Science & Engineering, Artificial Intelligence & Machine Learning, and Master of Computer Applications.
            </li>
            <li>
              <strong>NIE South Campus:</strong> Offers a wide array of undergraduate and postgraduate programs across engineering disciplines.
            </li>
          </ul>
          All programs are recognized under VTU and AICTE, with several receiving <strong>Tier-I accreditation</strong> from NBA.
        </p>
        <h2>Research & Innovation</h2>
        <p>
          NIE is home to <strong>15 Centres of Excellence</strong>, established in collaboration with industry leaders and distinguished alumni, providing students with hands-on opportunities and consultancy services. Ongoing research projects are funded by central and state governments, VTU, and international collaborators.
        </p>
        <h2>Campus Life</h2>
        <p>
          Students at NIE enjoy a vibrant campus life enriched by world-class housing facilities, sports and cultural activities, and a strong emphasis on holistic development alongside academic rigor.
        </p>
      </div>
    </section>

          <section className="image-carousel-section">
          <h2>Our Recruiting Companies</h2>
          <div className="image-carousel">
            <button
              className="carousel-arrow left"
              onClick={() => scrollCarousel("left")}
            >
              &lt;
            </button>
            <div className="carousel-images" ref={carouselRef}>
              {/* Duplicating first and last images for circular scroll */}
              <img src="/Images/image5.png" alt="Image 5" />
              <img src="/Images/image1.png" alt="Image 1" />
              <img src="/Images/image2.png" alt="Image 2" />
              <img src="/Images/image3.png" alt="Image 3" />
              <img src="/Images/image4.png" alt="Image 4" />
              <img src="/Images/image5.png" alt="Image 5" />
              <img src="/Images/image1.png" alt="Image 1" />
            </div>
            <button
              className="carousel-arrow right"
              onClick={() => scrollCarousel("right")}
            >
              &gt;
            </button>
          </div>
          {isAdmin && <button className="edit-button">Edit Carousel</button>}
        </section>

        <section className="placement-highlights-section">
      <div className="container">
        <h2 className="section-title">Placement Highlights</h2>
        <div className="content">
        <div className="placement-banner">
        <img 
          src="/Images/image6.png" 
          alt="Placement Highlights" 
          className="banner-image" 
        />
      </div>
      <div className="placement-description">
    <p>
      Since the academic year 2021-22, we have had the privilege of hosting over 450+ companies annually, 
      including 260+ IT firms and 150+ core industry giants. In the past five years, an impressive 3,126 
      students have been successfully placed through campus recruitment.
    </p>
    <p>
      Our campus has been graced by visits from esteemed core companies across various domains, including 
      Applied Materials, SABRE, ABB Ltd., Mercedes-Benz, and Larsen & Toubro for Mechanical and Industrial & 
      Production Engineering. Broadcom and National Instruments have collaborated with us for Electrical & 
      Electronics as well as Electronics & Communication Engineering, while leading IT firms like TCS and 
      Wipro have consistently partnered with our Computer Science department.
    </p>
    <p>
      Adding to this, several globally renowned dream companies such as Cisco, VMware, Intuit, IBM, Amazon, 
      Twilio, Google, SAP Labs, and Microsoft have handpicked our students, paving the way for exceptional 
      career opportunities.
    </p>
    <p>
      At the heart of this success lies the unwavering dedication of our placement cell. Each year, it 
      meticulously plans and conducts training programs tailored to placements, along with initiatives for 
      holistic personality development, ensuring that every student is prepared to excel in their professional 
      journeys.
    </p>
  </div>
        </div>
      </div>
    </section>

    <section className="placement-department-section">
  <h2>Training and Placement Department</h2>
  <div className="placement-department-content">
    <p>
      The Placement & Training department of NIE plays a vital role and is becoming a key department of the Institute. From the very beginning, the institute lays greater emphasis on Industrial Training and Practical Training for engineering students. NIE is one among the first engineering colleges to establish the Training and Placement Department. Employment of the students of the college is our major concern. The Placement Cell serves to merely bridge the gap between a job-aspirant and a prospective employer.
    </p>
    <p>
      Placement Cell interacts with more than 200 reputed organizations for arranging campus interviews for the final year BE/MTech/MCA/PhD students. We make efforts to organize technical seminars, workshops, and corporate expectation sessions. Industry personnel are invited periodically to enrich the knowledge of our student community with the latest technological innovations and industry practices. We produce graduates who are well-equipped to handle the working norms of the industry.
    </p>
    <p>
      The Training and Placement Department is located on the first floor of the Admin block. The Training and Placement Department has a fully furnished seminar hall named Sarvepalli Radhakrishnan Seminar Hall for company presentations, group discussion rooms, conferencing facilities, and interview and discussion rooms.
    </p>
  </div>
</section>



          <section className="events-section">
            <h2>Placement Event Highlights</h2>
            <div className="gallery">
                <img src="" alt = ""/>
            </div>
            {isAdmin && <button className="edit-button">Manage Highlights</button>}
          </section>

          <section className="videos-section">
  <h2>Promotional Videos</h2>
  <div className="video-gallery">
    <iframe
      src="https://www.youtube.com/embed/yT4edwb2GK0"
      title="Promotional Video"
      allowFullScreen
      className="video-frame"
    />
    <iframe
      src="https://www.youtube.com/embed/qbaYRGBLLuE"
      title="Promotional Video 2"
      allowFullScreen
      className="video-frame"
    />
    {/* Add more video frames as needed */}
  </div>
</section>

<section className="recruiters-highlights">
      <h2>Our Recruiters</h2>
      <div className="carousel-container">
        <div className="carousel-buttons">
          <button
            className="carousel-btn left"
            onClick={() => scrollCarousel("left")}
          >
            &lt;
          </button>
        </div>
        <div
          className="carousel-images"
          ref={carouselRef}
        >
          <img src="/Images/image12.jpg" alt="Company 1" />
          <img src="/Images/image13.jpg" alt="Company 2" />
          <img src="/Images/image14.jpg" alt="Company 3" />
          <img src="/Images/image15.jpg" alt="Company 4" />
          <img src="/Images/image16.jpg" alt="Company 5" />
          <img src="/Images/image17.jpg" alt="Company 6" />
          <img src="/Images/image18.jpg" alt="Company 7" />
          <img src="/Images/image19.jpg" alt="Company 8" />
          <img src="/Images/image20.jpg" alt="Company 9" />
          <img src="/Images/image21.jpg" alt="Company 10" />
          {/* Duplicating first and last images for circular scroll */}
          <img src="/Images/image12.jpg" alt="Company 1" />
          <img src="/Images/image13.jpg" alt="Company 2" />
        </div>
        <div className="carousel-buttons">
          <button
            className="carousel-btn right"
            onClick={() => scrollCarousel("right")}
          >
            &gt;
          </button>
        </div>
      </div>
    </section>

    <section className="looking-for-talent">
      <h2>Looking for Talent?</h2>
      <p>
        Get in touch to tap into the talent pool of the NIE student community.
        Contact us here for recruitment and collaboration inquiries.
      </p>
      <a href="/contact-us" className="contact-button">Contact Us</a> {/* Link to contact form */}
    </section>


          <footer className="footer">
            <p>Contact us : placement@nie.ac.in | Phone : +91-9999999999</p>
            <p>&copy; 2024 Placement Department. All Rights Reserved</p>
          </footer>
        </div>
        // </AdminTaskbar>
    );
};
export default AdminHome;