// import React, { useState, useEffect } from "react";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";

// const AddPOC = () => {
//   const [formData, setFormData] = useState({
//     client_code: "",
//     end_client: "",
//     req_date: "",
//     req_time: "",
//     poc_title: "",
//     poc_link: "",
//     req_type: "",
//     developer_name: "",
//     res_date: "",
//     res_time: "",
//   });

//   const [message, setMessage] = useState("");
//   const [clientCodes, setClientCodes] = useState([]);

//   useEffect(() => {
//     const fetchClientCodes = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5001/api/get-client-codes"
//         );
//         const data = await response.json();
//         if (response.ok) {
//           setClientCodes(data.client_codes);
//         } else {
//           setMessage("Failed to fetch client codes.");
//         }
//       } catch (error) {
//         setMessage("Error fetching client codes.");
//       }
//     };

//     fetchClientCodes();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5001/api/add-poc", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage(data.message);
//       } else {
//         setMessage(data.message);
//       }
//     } catch (err) {
//       setMessage("Error adding POC link.");
//     }
//   };

//   return (
//     <Container>
//       <Row className="justify-content-md-center">
//         <Col md={8}>
//           <h2 className="text-center my-4">Add POC Link</h2>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="clientCode" className="mb-3">
//               <Form.Label>Client Code</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="client_code"
//                 value={formData.client_code}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select a client code</option>
//                 {clientCodes.map((code) => (
//                   <option key={code} value={code}>
//                     {code}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>

//             <Form.Group controlId="endClient" className="mb-3">
//               <Form.Label>End Client</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="end_client"
//                 value={formData.end_client}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="reqDate" className="mb-3">
//               <Form.Label>Request Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="req_date"
//                 value={formData.req_date}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="reqTime" className="mb-3">
//               <Form.Label>Request Time</Form.Label>
//               <Form.Control
//                 type="time"
//                 name="req_time"
//                 value={formData.req_time}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="pocTitle" className="mb-3">
//               <Form.Label>POC Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="poc_title"
//                 value={formData.poc_title}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="pocLink" className="mb-3">
//               <Form.Label>POC Link</Form.Label>
//               <Form.Control
//                 type="url"
//                 name="poc_link"
//                 value={formData.poc_link}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="reqType" className="mb-3">
//               <Form.Label>Request Type</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="req_type"
//                 value={formData.req_type}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="developerName" className="mb-3">
//               <Form.Label>Developer Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="developer_name"
//                 value={formData.developer_name}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="resDate" className="mb-3">
//               <Form.Label>Response Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="res_date"
//                 value={formData.res_date}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="resTime" className="mb-3">
//               <Form.Label>Response Time</Form.Label>
//               <Form.Control
//                 type="time"
//                 name="res_time"
//                 value={formData.res_time}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit" className="w-100">
//               Add POC Link
//             </Button>
//             {message && <div className="alert alert-info mt-3">{message}</div>}
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AddPOC;

import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";

const AddPOC = () => {
  const [formData, setFormData] = useState({
    client_code: "",
    end_client: "",
    req_date: "",
    req_time: "",
    poc_data: "",
    req_type: "",
    developer_name: "",
    res_date: "",
    res_time: "",
  });

  const [message, setMessage] = useState("");
  const [clientCodes, setClientCodes] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    const fetchClientCodes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/get-client-codes"
        );
        const data = await response.json();
        if (response.ok) {
          setClientCodes(data.client_codes);
        } else {
          setMessage("Failed to fetch client codes.");
        }
      } catch (error) {
        setMessage("Error fetching client codes.");
      }
    };

    fetchClientCodes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePreview = () => {
    const lines = formData.poc_data
      .split("\n")
      .filter((line) => line.trim() !== "");
    const parsed = lines.map((line) => {
      const [poc_title, poc_link] = line.split("\t");
      return { poc_title: poc_title.trim(), poc_link: poc_link.trim() };
    });
    setParsedData(parsed);
    setShowPreview(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPreview(false);

    // Create an array of requests to send to the server
    const requests = parsedData.map((data) => ({
      ...formData,
      poc_title: data.poc_title,
      poc_link: data.poc_link,
    }));

    try {
      const responses = await Promise.all(
        requests.map((request) =>
          fetch("http://localhost:5001/api/add-poc", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
          })
        )
      );

      const results = await Promise.all(responses.map((res) => res.json()));

      // Check if all responses are OK
      const allOk = results.every((result) => result.success);
      const failedResults = results.filter((result) => !result.success);

      if (allOk) {
        setMessage("POC links added successfully.");
      } else {
        const errors = failedResults
          .map((result) => result.message || "Unknown error")
          .join(", ");
        setMessage(`Failed to add some POC links: ${errors}`);
      }
    } catch (err) {
      setMessage("Error adding POC links.");
      console.error("Submission error:", err); // Log detailed error
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 className="text-center my-4">Add POC Links</h2>
          <Form>
            <Form.Group controlId="clientCode" className="mb-3">
              <Form.Label>Client Code</Form.Label>
              <Form.Control
                as="select"
                name="client_code"
                value={formData.client_code}
                onChange={handleChange}
                required
              >
                <option value="">Select a client code</option>
                {clientCodes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="endClient" className="mb-3">
              <Form.Label>End Client</Form.Label>
              <Form.Control
                type="text"
                name="end_client"
                value={formData.end_client}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="reqDate" className="mb-3">
              <Form.Label>Request Date</Form.Label>
              <Form.Control
                type="date"
                name="req_date"
                value={formData.req_date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="reqTime" className="mb-3">
              <Form.Label>Request Time</Form.Label>
              <Form.Control
                type="time"
                name="req_time"
                value={formData.req_time}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="pocData" className="mb-3">
              <Form.Label>POC Data</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                name="poc_data"
                value={formData.poc_data}
                onChange={handleChange}
                required
                placeholder="Paste titles and links here, separated by tabs and new lines."
              />
            </Form.Group>

            <Form.Group controlId="reqType" className="mb-3">
              <Form.Label>Request Type</Form.Label>
              <Form.Control
                type="text"
                name="req_type"
                value={formData.req_type}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="developerName" className="mb-3">
              <Form.Label>Developer Name</Form.Label>
              <Form.Control
                type="text"
                name="developer_name"
                value={formData.developer_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="resDate" className="mb-3">
              <Form.Label>Response Date</Form.Label>
              <Form.Control
                type="date"
                name="res_date"
                value={formData.res_date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="resTime" className="mb-3">
              <Form.Label>Response Time</Form.Label>
              <Form.Control
                type="time"
                name="res_time"
                value={formData.res_time}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button
              variant="secondary"
              onClick={handlePreview}
              className="w-100 mb-2"
            >
              Preview
            </Button>
            <Button variant="primary" onClick={handleSubmit} className="w-100">
              Add POC Links
            </Button>
            {message && <div className="alert alert-info mt-3">{message}</div>}
          </Form>

          {/* Preview Modal */}
          <Modal show={showPreview} onHide={() => setShowPreview(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Preview POC Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Client Code:</h5>
              <p>{formData.client_code}</p>
              <h5>End Client:</h5>
              <p>{formData.end_client}</p>
              <h5>Request Date:</h5>
              <p>{formData.req_date}</p>
              <h5>Request Time:</h5>
              <p>{formData.req_time}</p>
              <h5>Request Type:</h5>
              <p>{formData.req_type}</p>
              <h5>Developer Name:</h5>
              <p>{formData.developer_name}</p>
              <h5>Response Date:</h5>
              <p>{formData.res_date}</p>
              <h5>Response Time:</h5>
              <p>{formData.res_time}</p>
              <h5>POC Links:</h5>
              <ul>
                {parsedData.map((data, index) => (
                  <li key={index}>
                    <strong>Title:</strong> {data.poc_title} <br />
                    <strong>Link:</strong> {data.poc_link}
                  </li>
                ))}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowPreview(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPOC;
