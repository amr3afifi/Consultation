import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBRow, MDBCol } from 'mdbreact';

const Home = () => {
  return (
    <MDBRow>
      <div style={{ width:'100%' , minWidth: '400px', maxWidth:'1200px', margin:'1% auto' }}>
      <MDBCol className=" p-5 text-center" style={{ margin:'1% auto',}}>
        <MDBCard reverse>
          <MDBCardImage  className="ml-5" cascade style={{ margin:'30px auto 10px auto',width:'80%', minWidth: '320px' , height: '80%',minHeight: '280px' }} src="https://cdn.dribbble.com/users/272511/screenshots/4387029/artboard_27.jpg" />
          <MDBCardBody cascade className="p-3">
            <MDBCardTitle></MDBCardTitle>
            <h5 className="">No Room For Racism</h5>
            <h4 className="indigo-text text-danger"><strong>The Egyptian Premier League</strong></h4>
            <h4>دوري المتعة</h4>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      </div>

      
    </MDBRow>
  )
}

export default Home;