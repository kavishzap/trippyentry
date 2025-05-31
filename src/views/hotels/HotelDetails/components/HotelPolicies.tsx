import { Card, CardBody, CardHeader } from 'react-bootstrap'
import {BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs'



const HotelPolicies = () => {
  return (
    <Card className="bg-transparent">
      <CardHeader className="border-bottom bg-transparent px-0 pt-0">
        <h3 className="mb-0">Event Policies</h3>
      </CardHeader>
      <CardBody className="pt-4 p-0">
        <ul className="list-group list-group-borderless mb-2">
         
          <li className="list-group-item d-flex align-items-start">
            <BsCheckCircleFill size={24} className=" me-2" />
            Drinking and smoking within controlled limits are permitted at the farmhouse but please do not create a mess or ruckus at the house.
          </li>
          <li className="list-group-item d-flex align-items-start">
            <BsCheckCircleFill size={18} className=" me-2" />
            Drugs and intoxicating illegal products are banned and not to be brought to the house or consumed.
          </li>
          <li className="list-group-item d-flex align-items-start">
            <BsXCircleFill className=" me-2" />
            For any update, the customer shall pay applicable cancellation/modification charges.
          </li>
        </ul>
      
       
        <div className="bg-danger bg-opacity-10 rounded-2 p-3 mb-5">
          <p className="mb-0 text-danger">
            Smoke alarm not reported — The host hasn't reported a smoke alarm on the property. We suggest bringing a portable detector for your trip.
          </p>
        </div>
      </CardBody>
    </Card>
  )
}

export default HotelPolicies
