import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import useFirebase from '../../../hooks/useFirebase';

const AddNewServices = () => {
    const { register, handleSubmit } = useForm();
    const { user } = useFirebase();
    const { id } = useParams();
    const [tour, setTour] = useState({});
    const history = useHistory();
    const { title, image, location, price, details } = tour;

    useEffect(() => {
        const url = `http://localhost:5000/tours/details/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setTour(data)
            )
    }, []);

    const onSubmit = (data) => {
        fetch("http://localhost:5000/addTour", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then(data => {
                console.log(data);

                if (data.acknowledged) {
                    swal("Order Place Success", {
                        icon: "success",
                    });
                    // history.push('/myOrders')
                }

            });
    }
    return (
        <Container>

            <div className='details-form w-75 '>
                <h1>Add Tour</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Title</label><br />
                    <input type='text' placeholder="Tour Title" defaultValue={''} {...register("title", { required: true, maxLength: 20 })} />

                    <label>Description</label><br />
                    <input defaultValue={''} type="text" placeholder="Description" {...register("details")} />

                    <label>Image Url</label><br />
                    <input placeholder="Image url" {...register("image", { required: true, maxLength: 20 })} />

                    <label>Location</label><br />
                    <input placeholder="Location" {...register("location", { required: true, maxLength: 20 })} />

                    <label>Price</label><br />
                    <input type="number" placeholder="Price" {...register("price", { required: true, minLength: 4, maxLength: 6 })} />

                    <label>Duration</label><br />
                    <input type="number" placeholder="Day" {...register("day", { required: true, maxLength: 1 })} />

                    <input type="submit" value="Add Tour" />
                </form>
            </div>
            <div>

            </div>

        </Container>
    );
};

export default AddNewServices;


// _id
// :618028970b1e0ffa882c9a83
// key
// :"616d774d9bbe5bfc86219501"
// image
// :"https://i.ibb.co/VQ0ck1S/tour3.jpg"
// index
// :1
// price
// :8219
// title
// :"The Dark Forest Adventure"
// rating
// :1.15
// day
// :3
// details
// :"No matter how much time you have, there are plenty of ways to enjoy an..."
// location
// :"China"