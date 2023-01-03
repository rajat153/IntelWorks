import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button } from "semantic-ui-react";

function EditUser() {

  const intialValues = {
    firstName: "",
    lastName: "",
    emailId: "",
    mobile: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  };

  const [state1, setState1] = useState([]);
  const [country1, setCountry1] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [formData, setFormdata] = useState(intialValues);


  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "First name should not null";
    } else if (values.firstName.length < 5) {
      errors.firstName = "First name length atleast of 5 characters";
    }
    if (!values.lastName) {
      errors.lastName = "Last name should not null";
    } else if (values.lastName.length < 5) {
      errors.lastName = "Last name length atleast of 5 characters";
    }
    if (!values.emailId) {
      errors.emailId = "Email is required!";
    } else if (!regex.test(values.emailId)) {
      errors.emailId = "This is not a valid email format!";
    }
    if (!values.zipCode) {
      errors.zipCode = "Zip Code Cannot be null";
    } else if (values.zipCode.toString().length !== 6) {
      errors.zipCode = "Zip Code must be of 6 digits";
    }

    return errors;
  };

  useEffect(() => {
    getCountry();
  }, []);

  const getCountry = async () => {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/states"
    );
    const data = await res.json();
    setCountry1(data.data);
  };


  useEffect(() => {
    postData();
  }, []);

  const { id } = useParams();

  const postData = async () => {
    try {
      const res = await fetch(`http://localhost:3030/edit/${id}`);
      const data = await res.json();
      setFormdata(data);
     
    } catch (err) {
      console.log("front error", err);
    }
  };

  const {
    firstName,
    lastName,
    mobile,
    emailId,
    address1,
    address2,
    city,
    country,
    state,
    zipCode,
  } = formData;

  const updateData = async () => {
    try {
      const res = await fetch(`http://localhost:3030/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          mobile,
          emailId,
          address1,
          address2,
          city,
          country,
          state,
          zipCode,
        }),
      });
      const data = await res.json();
     
    } catch (err) {
      console.log("front error", err);
    }
  };

  const handleChange = (e) => {
    setFormdata((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      updateData();
      console.log("form updated ");
    } else {
      console.log("form not updated");
    }
  }, [formErrors]);

  
  useEffect(() => {
    getState();
  }, [formData.country]);

  const getState = async () => {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/states",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({ country: formData.country }),
      }
    );
    const data = await res.json();
    setState1(data.data.states);
  };


  return (
    <div className="ui container left aligned">
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Field
            id="form-input-control-first-name"
            control={Input}
            label="First name"
            placeholder="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={formErrors.firstName}
          />
          <Form.Field
            id="form-input-control-last-name"
            control={Input}
            label="Last name"
            placeholder="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={formErrors.lastName}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            id="form-input-control-email"
            control={Input}
            label="Email"
            placeholder="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            error={formErrors.emailId}
          />
          <Form.Field>
            <label>Mobile</label>
            <Input
              type="Number"
              placeholder="Enter mobile number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Address1</label>
            <Input
              type="text"
              placeholder="Address1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Address2</label>
            <Input
              type="text"
              placeholder="Address2"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label htmlFor="country">Country</label>
            <select
              name="country"
              id="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="" hidden={true} defaultValue>
                Select Country
              </option>
              {country1.map((item) => {
                return (
                  <option key={item.iso3} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </Form.Field>

          <Form.Field>
            <label htmlFor="state">State</label>
            <select
              name="state"
              id="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="" hidden={true} defaultValue>
                Select State
              </option>
              {state1.map((item) => {
                return (
                  <option key={item.state_code} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>city</label>
            <Input
              type="text"
              placeholder="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field
            id="form-input-control-zipCode"
            control={Input}
            label="Zip Code"
            placeholder="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            error={formErrors.zipCode}
          />
        </Form.Group>
        <Form.Field
          id="form-button-control-public"
          control={Button}
          content="Submit"
        />
      </Form>
    </div>
  );
}

export default EditUser;
