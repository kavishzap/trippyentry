import { Card, CardBody, CardHeader } from 'react-bootstrap'
import {BsCheckCircleFill } from 'react-icons/bs'



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
            Respect fellow attendees, performers, and staff at all times.
          </li>
          <li className="list-group-item d-flex align-items-start">
            <BsCheckCircleFill size={18} className=" me-2" />
            Any form of harassment, aggression, or disorderly behavior will result in removal from the venue.
          </li>
        </ul>
      
       
        <div className="bg-danger bg-opacity-10 rounded-2 p-3 mb-5">
          <p className="mb-0 text-danger">
           Valid ID and a confirmed ticket are required for entry.
          </p>
        </div>
      </CardBody>
    </Card>
  )
}

export default HotelPolicies
