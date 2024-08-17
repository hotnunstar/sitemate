import GlobalStyle from './styles/global'
import styled from "styled-components"
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const Title = styled.h2``;

function App() {
  const [issues, setIssues] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getIssues = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setIssues(res.data.sort((a, b) => (a.title > b.title ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getIssues();
  }, [setIssues]);


	return (
		<>
      <Container>
        <Title>Issues</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getIssues={getIssues} ></Form>
        <Grid setOnEdit={setOnEdit} issues={issues} setIssues={setIssues}></Grid>
      </Container>
			<ToastContainer autoClose={3000} ></ToastContainer>
			<GlobalStyle></GlobalStyle>
		</>
	)
}

export default App
