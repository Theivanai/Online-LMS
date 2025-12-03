import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { addBookRequest, clearBookStatus } from '../../Redux/book/bookSlice';
import styles from './AddBook.module.css';

const AddBook = () => {
    const dispatch = useDispatch();
    const { success, error, loading } = useSelector((state) => state.Books);

    const imageRef = useRef(null);
    const bookFileRef = useRef(null);

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        category: '',
        price: '',
        stock: '',
        image: null,
        bookFile: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'title' ? value.toUpperCase() : value;
        setFormData((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleBookFileChange = (e) => {
        setFormData({ ...formData, bookFile: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { title, author, isbn, category, price, stock, image, bookFile } = formData;
        if (!title || !author || !isbn || !category || !price || !stock || !image || !bookFile) {
            toast.error('Please fill in all fields');
            return;
        }

        dispatch(addBookRequest({ ...formData }));
    };

    useEffect(() => {
        if (success) {
            toast.success('Book Added Successfully!');
            setFormData({
                title: '',
                author: '',
                isbn: '',
                category: '',
                price: '',
                stock: '',
                image: null,
                bookFile: null,
            });

            // Reset file inputs
            if (imageRef.current) imageRef.current.value = '';
            if (bookFileRef.current) bookFileRef.current.value = '';

            dispatch(clearBookStatus());
        }

        if (error) {
            if (error.toLowerCase().includes('isbn')) {
                toast.error('ISBN already exists');
            } else {
                toast.error(error);
            }
            dispatch(clearBookStatus());
        }
    }, [success, error, dispatch]);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className={`shadow-sm ${styles.addBookCard}`}>
                        <Card.Body>
                            <h4 className={styles.formTitle}>ADD NEW BOOK</h4>

                            <Form onSubmit={handleSubmit}>

                                <Form.Group className="mb-3">
                                    <Form.Label className={styles.label}>TITLE</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className={styles.inputField}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className={styles.label}>AUTHOR</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleChange}
                                        className={styles.inputField}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className={styles.label}>ISBN</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="isbn"
                                        value={formData.isbn}
                                        onChange={handleChange}
                                        className={styles.inputField}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className={styles.label}>CATEGORY</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className={styles.inputField}
                                    />
                                </Form.Group>

                                {/* PRICE + STOCK */}
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label className={styles.label}>PRICE</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                className={styles.inputField}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label className={styles.label}>STOCK</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="stock"
                                                value={formData.stock}
                                                onChange={handleChange}
                                                className={styles.inputField}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* IMAGE */}
                                <Form.Group className="mb-3">
                                    <Form.Label className={styles.label}>BOOK IMAGE</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        ref={imageRef}
                                        className={styles.fileInput}
                                    />
                                </Form.Group>

                                {/* PDF */}
                                <Form.Group className="mb-4">
                                    <Form.Label className={styles.label}>BOOK PDF</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleBookFileChange}
                                        ref={bookFileRef}
                                        className={styles.fileInput}
                                    />
                                </Form.Group>

                                <Button variant="success" type="submit" disabled={loading} className={styles.submitBtn}>
                                    {loading ? "Adding..." : "ADD BOOK"}
                                </Button>

                            </Form>
                            <ToastContainer position="top-center" autoClose={1200} closeButton={false} />
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Container>
    );
};

export default AddBook;

