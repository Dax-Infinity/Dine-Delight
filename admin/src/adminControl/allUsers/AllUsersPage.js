import React, { useEffect, useState } from 'react';
import {
    Container, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Button
} from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { API_URL } from '../../components/constant/Constant';
import '../allUsers/allUsersPage.css';

const AllUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${API_URL}/user/allusers`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <Navbar />
            <Container className="all-users-page">
                <Typography variant="h4" gutterBottom className="page-title">
                    All Users
                </Typography>
                <Paper elevation={6} className="table-paper">
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="table-header">No.</TableCell>
                                    <TableCell className="table-header" style={{ 'width': '30%' }}>Name</TableCell>
                                    <TableCell className="table-header" style={{ 'width': '30%' }}>Email</TableCell>
                                    <TableCell className="table-header">Role</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {error ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="error-cell">
                                            <Typography variant="body1" color="error">
                                                {error}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : users.length > 0 ? (
                                    users.map((user, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{user.fname} {user.lname}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>Client</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="no-data-cell">
                                            <Typography variant="body1">
                                                No users found.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
            <Footer />
        </>
    );
};

export default AllUsersPage;
