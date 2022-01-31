import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
function Home() {
  const [input, setInput] = useState("");
  const [gender, setgender] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [recent, setRecent] = useState([]);
  const [active, setActive] = useState(false);

  //    const[gender,setgender]=useState("")

  function fetchDetails() {
    axios
      .get(`https://api.agify.io?name=${input}`)
      .then((res) => {
        setAge(res.data.age);
        if (input == "") {
          setAge("");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`https://api.genderize.io?name=${input}`)
      .then((res) => {
        //   console.log(res)
        setgender(res.data.gender);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`https://api.nationalize.io?name=${input}`)
      .then((res) => {
        setNationality(res.data.country[0].country_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchAge(e) {
    setInput(e.target.value);

    if (e.target.value.length > 2) {
      setActive(true);
      fetchDetails();
      setTimeout(() => {
        setRecent([...recent, e.target.value]);

        if (recent.length === 6) {
          recent.shift();
          setRecent(recent);
        }
        localStorage.setItem("recent", JSON.stringify(recent));
      }, 2000);
    }
    if (e.target.value == "") {
      setAge("");
      setgender("");
      setNationality("");
      setActive(false);
    }
  }

  let arr = JSON.parse(localStorage.getItem("recent"));

  return (
    <>
      <div>
        <h1 style={{ color: "red" }}>Enter Your Name below:-</h1>
      </div>
      <Container>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "50ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={input}
            onChange={fetchAge}
          />
        </Box>
        {active ? (
          <div style={{ border: "1px solid black", overflowY: "scroll" }}>
            <ol>
              <p>Recent:</p>
              {arr.map((e) => (
                <li>{e}</li>
              ))}
            </ol>
          </div>
        ) : null}
        <Details>
          <Age>Age:{age}</Age>
          <Gender>Gender:{gender}</Gender>
          <Nationality>Nationality:{nationality}</Nationality>
        </Details>
      </Container>
    </>
  );
}
const Container = styled.div`
  position: absolute;
  top: 20%;
  left: 38%;
  padding: 20px 20px 20px 20px;
  border: 1px solid black;
  background: white;
`;
const Age = styled.h2`
  color: red;
`;
const Gender = styled.h2`
  color: blue;
`;
const Nationality = styled.h2`
  color: green;
`;
const Details = styled.div``;
export default Home;
