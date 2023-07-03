import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
//import GoBack from '../components/goBack';

import { Link } from 'react-router-dom';

import { AiFillDelete } from 'react-icons/ai'
import { MdEditDocument } from 'react-icons/md'
import { GrView } from 'react-icons/gr'
import { toast } from 'react-toastify';

// format date
import format from 'date-fns/format'
import moment from 'moment';


const AllUserList = () => {
    const [data, setData] = useState([]);

    const [search, setSearch] = useState("");

    const [filteredName, setFilteredName] = useState([]);

    // view post list
    const getPost = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/allusers', {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,    // IMPORTANT!!!
            })
            setData(response.data.users);
            setFilteredName(response.data.users);
            console.log(response.data.users)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getPost();
    }, [])



    // filter by name function
    useEffect(() => {
        const result = data?.filter((userName) => {
            return userName?.postedBy?.name.toLowerCase().match(search.toLowerCase());
        });

        setFilteredName(result);
    }, [search]);


    // productList.filter((productList) =>productList.category === {category})



    const columns = [
        {
            name: "Name",
            selector: (row) => row?.name,
            sortable: true,
            minWidth: "130px",
            maxWidth: "130px"
        },
        {
            name: "Email",
            selector: (row) => row?.email,
            minWidth: "180px",
            maxWidth: "180px"
        },
        {
            name: "Image",
            selector: (row) => <img width={50} height={50} src={row?.image?.url} />,
            minWidth: "100px",
            maxWidth: "100px"
        },
        {
            name: "Role",
            selector: (row) => row?.role,
            minWidth: "60px",
            maxWidth: "60px"
        },
        {
            name: "Created At",
            // selector: (row) => row.createdAt,
            // selector: row => new Date(row.createdAt).toLocaleString(),
            // selector: (row) => format(new Date(row.createdAt), 'MM/dd/yyyy, HH:MM'),
            selector: (row) => moment(row.createdAt).format('MMMM Do YYYY . h:mm:ss a'),
            // renderCell: (params) => (
            //     moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            // ),

            sortable: true,
            minWidth: "150px",
            maxWidth: "150px"
        },
        {
            name: "Action",
            // cell: row =>
            //     <button
            //         onClick={() => alert(row?._id)}
            //     >
            //         Edit
            //     </button>

            width: 100,
            cell: (row) => (
                <div className='flex justify-between w-[180px] text-2xl'>
                    <Link to={`/singleuser/${row?._id}`}>
                        <button className='text-green-500'>
                            <GrView className='text-green-500' />
                            {/* Edit */}
                        </button>
                    </Link>
                </div>
            ),
            minWidth: "170px",
            maxWidth: "170px"
        },
    ]




    return (

        <div>
            {/* <GoBack /> */}
            <DataTable
                columns={columns}
                data={filteredName}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='480px'
                highlightOnHover
                // actions = {
                //     <button>Export</button>
                // }


                // seach component
                subHeader
                subHeaderComponent={
                    <input
                        type="text"
                        placeholder='Search here...'
                        className='border-2 px-3 py-1 rounded-md'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                }
            // subHeaderAlign='left'
            />

            {/* {
                data?.map((post, i) => {
                    return (
                        <div key={i}>
                            <p>{post?.title}</p>
                            <p>{post?.content}</p>
                            <p>{post?.postedBy.name}</p>
                            <img width={50} height={50} src={post?.image} />
                            
                        </div>
                    )
                })
            } */}
        </div>
    )
}

export default AllUserList