import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { Button,Table,Container } from "semantic-ui-react";


function ViewUser() {

  let navigate = useNavigate();
  const [viewUser, setViewUser] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("http://localhost:3030/view");
    const data = await res.json();
    setViewUser(data);
  };

  console.log(viewUser);


  const handleDelete = async (id) => {
    try{
    const res = await fetch("http://localhost:3030/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    alert('User Successfully deleted')
    navigate(-1)
    }catch(e){
        console.log(e)
    }
  };

  return (
    <Container>
         <Table>
      <Table.Header >
        <Table.Row textAlign="center">
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Last Name</Table.HeaderCell>
          <Table.HeaderCell>E-mail</Table.HeaderCell>
          <Table.HeaderCell>Mobile</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      {viewUser.map((item, key) => {
        return (
          <Table.Body key={item._id}>
            <Table.Row textAlign="center">
              <Table.Cell>{item.firstName}</Table.Cell>
              <Table.Cell>{item.lastName}</Table.Cell>
              <Table.Cell>{item.emailId}</Table.Cell>
              <Table.Cell>{item.mobile}</Table.Cell>
              <Table.Cell>
                <Button>
                  <Link to={`/edit/${item._id}`}>Edit</Link>
                </Button>
                <Button onClick={() => handleDelete(item._id)}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        );
      })}
    </Table>
    </Container>
   
  );
}

export default ViewUser;
