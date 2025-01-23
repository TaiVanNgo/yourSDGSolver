import {
  TableHead,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "./Loading";
const DataTable = () => {
  const [transactionIds, setTransactionIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchTransactionIds = async () => {
    const apiUrl = "http://localhost:3000/api/transaction/view";

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setTransactionIds(data); // Assuming the API response is the array of IDs
    } catch (err) {
      console.error("Error fetching transaction IDs:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionIds();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Transaction ID</TableCell>
            <TableCell align="center">View Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionIds.map((id) => (
            <TableRow key={id}>
              <TableCell align="center">{id}</TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  className="text-blue-500 underline transition-colors duration-200 hover:text-blue-700"
                  size="small"
                  onClick={() => navigate(`/transaction/${id}`)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default DataTable;
