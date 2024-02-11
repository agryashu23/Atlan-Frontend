import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import {useNavigate} from 'react-router-dom';
import "./Home.css";
import { Helmet } from 'react-helmet';

const Home = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const toRotate = [ "AI Model World", "Machine-Learning Algorithms", "The Future Of Tomorrow" ];
  const period = 1000;

  useEffect(() => {
    // const loadStartTime = window.performance.timing.navigationStart;
    // const loadEndTime = window.performance.timing.loadEventEnd;
    // const pageLoadTime = loadEndTime - loadStartTime;
    // console.log(`Page load time: ${pageLoadTime} ms`);
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  },)

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(300);
    } 
  }

  const navigateToExplore = () => {
    navigate('/explore');
  };

  return (
    <>
    <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Homepage " />
      </Helmet>
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h1>{`Welcome to`} <span className="txt-rotate" dataperiod="1000"><span className="wrap">{text}</span></span></h1>
                  <p>Welcome to the forefront of innovation! ModelHub is a gateway to explore the most advanced AI models that are transforming 
                    industries and redefining what's possible.
                  </p>
                  <button className="tagline" onClick={navigateToExplore}>Get Started <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src="https://res.cloudinary.com/dwpzhmg6o/image/upload/v1707544939/si64elvo5sxnxkr7o1lt.svg" alt="Header Img" loading="lazy"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}
export default Home;
