import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import GoBack from '../components/goBack';

import { Link } from 'react-router-dom';

import { AiFillDelete } from 'react-icons/ai'
import { MdEditDocument } from 'react-icons/md'
import { toast } from 'react-toastify';

// format date
import format from 'date-fns/format'

const AdminDashboard = () => {
    const [data, setData] = useState([]);

    const [search, setSearch] = useState("");

    const [filteredName, setFilteredName] = useState([]);

    // view post list
    const getPost = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/posts/view', {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,    // IMPORTANT!!!
            })
            setData(response.data.posts);
            setFilteredName(response.data.posts);
            console.log(response.data.posts)
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




    // delete post by ID
    const deletePostById = async (e, id) => {
        // console.log(id)
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                const { data } = await axios.delete(`http://localhost:8000/api/delete/post/${id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,    // IMPORTANT!!!
                })
                if (data.success === true) {
                    toast.success(data.message);
                    getPost();
                }
            } catch (error) {
                console.log(error);
                toast.error(error);
            }
        }
    }




    const columns = [
        {
            name: "Posted By",
            selector: (row) => row?.postedBy?.name,
            sortable: true
        },
        {
            name: "Title",
            selector: (row) => row?.title,
        },
        {
            name: "Content",
            selector: (row) => <div dangerouslySetInnerHTML={{ __html: row?.content }}></div>,
        },
        {
            name: "Image",
            selector: (row) => <img width={50} height={50} src={row?.image?.url} />,
        },
        // {
        //     name: "User Pic",
        //     selector: (row) => <img width={50} height={50} src={row?.userPic?.profilePic?.url} />,
        // },
        {
            name: "Likes",
            selector: (row) => row?.likes.length,
        },
        {
            name: "Comments",
            selector: (row) => row?.comments.length,
        },
        {
            name: "Created At",
            // selector: (row) => row.createdAt,
            // selector: row => new Date(row.createdAt).toLocaleString(),
            selector: (row) => format(new Date(row.createdAt), 'MM/dd/yyyy, HH:MM'),
            // renderCell: (params) => (
            //     moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            // ),

            sortable: true,
            minWidth: "180px"
        },
        // {
        //     name: "Time",
        //     selector: (row) => format(new Date(row.createdAt), 'HH:MM'),
        // },
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
                <div className='flex justify-between w-[170px]'>
                    <Link to={`/post/edit/${row?._id}`}>
                        <button>
                            <MdEditDocument />
                            {/* Edit */}
                        </button>
                    </Link>
                    <button onClick={(e) => deletePostById(e, row?._id)}>
                        <AiFillDelete />
                    </button>

                </div>
            )
        },
    ]




    return (

        <div>
            <GoBack />
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

export default AdminDashboard