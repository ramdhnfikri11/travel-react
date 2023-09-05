import Carousel from 'react-bootstrap/Carousel';

function Slider() {
  return (
    <Carousel>
      <Carousel.Item>
        <img 
            className='d-block w-100'
            style={{height: '450px'}}
            src='https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg?size=626&ext=jpg&ga=GA1.2.1692439485.1692165783&semt=sph'
            alt='first slide'
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img 
            className='d-block w-100'
            style={{height: '450px'}}
            src='https://img.freepik.com/premium-photo/software-development-concept-coding-programmer-software-engineer-working-laptop-with-javascript-computer-code-virtual-screen-internet-things-iot-digital-technology-generative-ai-illustrator_993599-6019.jpg?size=626&ext=jpg&ga=GA1.1.1692439485.1692165783&semt=sph'
            alt='second slide'
            />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img 
            className='d-block w-100'
            style={{height: '450px'}}
            src='https://img.freepik.com/free-photo/team-programmers-talking-about-algorithm-running-laptop-screen-pointing-source-code-while-sitting-desk-software-developers-collaborating-data-coding-group-project_482257-33548.jpg?size=626&ext=jpg&ga=GA1.1.1692439485.1692165783&semt=sph'
            alt='third slide'
            />    
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;